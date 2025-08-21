import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Platform, ScrollView, Dimensions, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, Radius, Shadows, GlobalStyles } from '../styles/GlobalStyles';
import { updateTimer, deleteTimer } from '../services/timersService';

interface CheckInSelectorProps {
  checkIns: number;
  setCheckIns: (num: number) => void;
}

const CheckInSelector: React.FC<CheckInSelectorProps> = ({ checkIns, setCheckIns }) => {
  const maxCheckIns = 5;

  return (
    <View style={styles.checkInContainer}>
      <View style={styles.iconsContainer}>
        {[...Array(maxCheckIns)].map((_, index) => {
          const isSelected = index + 1 <= checkIns;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.iconWrapper, Shadows.subtle]}
              onPress={() => setCheckIns(checkIns === index + 1 ? 0 : index + 1)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={isSelected ? 'checkbox-marked-circle' : 'circle-outline'}
                size={32}
                color={isSelected ? Colors.base : Colors.light}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

interface DurationPickerProps {
  minutes: number;
  setMinutes: (num: number) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({ minutes, setMinutes }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = 60;
  const maxMinutes = 60;

  const scrollToInitial = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (minutes - 1) * itemWidth,
        animated: false,
      });
    }
  };

  const handleScroll = (event: any) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    const offsetX = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(offsetX / itemWidth);
    const newMinutes = Math.max(1, Math.min(selectedIndex + 1, maxMinutes));

    setMinutes(newMinutes);

    setTimeout(() => {
      isScrolling.current = false;
    }, 150); // Increased debounce for smoother updates
  };

  const handleSelect = (index: number) => {
    const newMinutes = index + 1;
    setMinutes(newMinutes);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * itemWidth,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.durationContainer}>
      <Text style={[Typography.subheading, styles.durationLabel]}>Duration (minutes)</Text>
      <View style={styles.pickerWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContent}
          onMomentumScrollEnd={handleScroll}
          onLayout={scrollToInitial}
        >
          {[...Array(maxMinutes)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.minuteItem,
                minutes === index + 1 && styles.selectedMinute,
              ]}
              onPress={() => handleSelect(index)}
            >
              <Text style={[Typography.body, minutes === index + 1 && styles.selectedText]}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

interface EditTimerModalProps {
  visible: boolean;
  onClose: () => void;
  timerId: string;
  currentName: string;
  currentMinutes: number | undefined;
  currentCheckIns: number;
  currentContact: string;
  onTimerUpdated: () => Promise<void>;
  onTimerDeleted: () => void;
}

const EditTimerModal: React.FC<EditTimerModalProps> = ({
  visible,
  onClose,
  timerId,
  currentName,
  currentMinutes,
  currentCheckIns,
  currentContact,
  onTimerUpdated,
  onTimerDeleted,
}) => {
  const [name, setName] = useState(currentName || '');
  const [minutes, setMinutes] = useState(currentMinutes || 17);
  const [checkIns, setCheckIns] = useState(currentCheckIns || 0);
  const [contact, setContact] = useState(currentContact || '');
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [errors, setErrors] = useState<{ name?: string; minutes?: string; checkIns?: string; general?: string }>({});

  // Fetch contacts on mount (skip on web)
  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
          setContacts(data);
        } else {
          setErrors({ general: 'Contacts permission denied.' });
        }
      })();
    }
  }, []);

  const selectContact = (selectedContact: Contacts.Contact) => {
    if (selectedContact.phoneNumbers && selectedContact.phoneNumbers.length > 0) {
      setContact(selectedContact.phoneNumbers[0].number ?? '');
    }
    setContactModalVisible(false);
  };

  // Animation for modal content fade-in
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible, opacity]);

  // Animation for button press
  const createButtonAnimation = () => {
    const scale = useSharedValue(1);
    const animatedButtonStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    return {
      scale,
      animatedButtonStyle,
      onPressIn: () => {
        scale.value = withTiming(0.95, { duration: 100 });
      },
      onPressOut: () => {
        scale.value = withTiming(1, { duration: 100 });
      },
    };
  };

  const updateButton = createButtonAnimation();
  const deleteButton = createButtonAnimation();
  const cancelButton = createButtonAnimation();

  const handleSave = async () => {
    const newErrors: { name?: string; minutes?: string; checkIns?: string; general?: string } = {};
    if (!name) newErrors.name = 'Timer name is required.';
    if (minutes <= 0) newErrors.minutes = 'Please select a valid number of minutes.';
    if (checkIns < 0) newErrors.checkIns = 'Number of check-ins cannot be negative.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await updateTimer(timerId, {
          timerName: name,
          minutes,
          checkIns,
          checkInContact: contact, // Optional, can be empty
        });
        Alert.alert('Success', 'Timer updated!');
        await onTimerUpdated();
        onClose();
      } catch (err) {
        setErrors({ general: 'Failed to update timer.' });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTimer(timerId);
      Alert.alert('Success', 'Timer deleted!');
      onTimerDeleted();
      onClose();
    } catch (err) {
      setErrors({ general: 'Failed to delete timer.' });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={Platform.select({ web: true, default: false })}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <Text style={[Typography.heading, styles.heading]}>Edit Timer</Text>

          <TextInput
            style={[styles.input, Typography.body, errors.name ? styles.inputError : {}]}
            value={name}
            placeholder="Timer name"
            placeholderTextColor={Colors.light}
            onChangeText={setName}
            autoCapitalize="none"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <DurationPicker minutes={minutes} setMinutes={setMinutes} />
          {errors.minutes && <Text style={styles.errorText}>{errors.minutes}</Text>}

          <CheckInSelector checkIns={checkIns} setCheckIns={setCheckIns} />
          {errors.checkIns && <Text style={styles.errorText}>{errors.checkIns}</Text>}

          <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, styles.contactButton, Shadows.subtle]}
            onPress={() => setContactModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={[Typography.body, { color: contact ? Colors.darker : Colors.light }]}>
              {contact || 'Select Check-in Contact'}
            </Text>
          </TouchableOpacity>

          {errors.general && <Text style={[styles.errorText, { marginTop: Spacing.sm }]}>{errors.general}</Text>}

          <View style={styles.buttonContainer}>
            <Animated.View style={[GlobalStyles.fullWidthButton, styles.submitButton, updateButton.animatedButtonStyle, Shadows.subtle]}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={handleSave}
                onPressIn={updateButton.onPressIn}
                onPressOut={updateButton.onPressOut}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="content-save" size={18} color={Colors.white} style={styles.buttonIcon} />
                <Text style={[GlobalStyles.buttonText, styles.buttonText]}>Update Timer</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[GlobalStyles.fullWidthButton, styles.deleteButton, deleteButton.animatedButtonStyle, Shadows.subtle]}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={handleDelete}
                onPressIn={deleteButton.onPressIn}
                onPressOut={deleteButton.onPressOut}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="trash-can" size={18} color={Colors.white} style={styles.buttonIcon} />
                <Text style={[GlobalStyles.buttonText, styles.buttonText]}>Delete Timer</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.orBreaker}>
            <View style={[styles.line, { backgroundColor: Colors.lighter }]} />
            <Text style={[Typography.caption, styles.orText, { color: Colors.dark }]}>or</Text>
            <View style={[styles.line, { backgroundColor: Colors.lighter }]} />
          </View>

          <Animated.View style={[styles.cancelButton, cancelButton.animatedButtonStyle, Shadows.subtle]}>
            <TouchableOpacity
              style={styles.cancelButtonContent}
              onPress={onClose}
              onPressIn={cancelButton.onPressIn}
              onPressOut={cancelButton.onPressOut}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="close-circle" size={18} color={Colors.base} />
            </TouchableOpacity>
          </Animated.View>

          <Modal
            visible={isContactModalVisible}
            animationType="slide"
            onRequestClose={() => setContactModalVisible(false)}
          >
            <SafeAreaView style={styles.contactModalContainer}>
              <Text style={[Typography.heading, styles.modalHeading]}>Select a Contact</Text>
              <FlatList
                data={contacts}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.contactItem}
                    onPress={() => selectContact(item)}
                  >
                    <Text style={[Typography.body, { color: Colors.darker }]}>{item.name}</Text>
                    {item.phoneNumbers?.[0]?.number && (
                      <Text style={[Typography.caption, { color: Colors.dark }]}>
                        {item.phoneNumbers[0].number}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[GlobalStyles.fullWidthButton, styles.modalCancelButton]}
                onPress={() => setContactModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={GlobalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditTimerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Platform.select({ web: 'rgba(0, 0, 0, 0.5)', default: Colors.white }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Platform.select({ web: '80%', default: '90%' }),
    maxWidth: 400,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.subtle,
  },
  heading: {
    color: Colors.base,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    color: Colors.darker,
    height: 56,
    lineHeight: 32,
  },
  inputError: {
    borderBottomColor: '#CC6666',
  },
  errorText: {
    color: '#CC6666',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  checkInContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    padding: Spacing.xs,
  },
  durationContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  durationLabel: {
    color: Colors.dark,
    marginBottom: Spacing.sm,
  },
  pickerWrapper: {
    width: '100%',
    height: 60,
  },
  scrollContent: {
    paddingHorizontal: (Dimensions.get('window').width - 60) / 2,
  },
  minuteItem: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Colors.lightest,
    marginHorizontal: Spacing.xs,
  },
  selectedMinute: {
    backgroundColor: Colors.base,
    ...Shadows.subtle,
  },
  selectedText: {
    color: Colors.white,
  },
  contactButton: {
    width: '100%',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.base,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  orBreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
    width: '60%',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: Spacing.xs,
  },
  cancelButton: {
    backgroundColor: Colors.lightest,
    borderRadius: Radius.full,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cancelButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: Spacing.sm,
  },
  buttonText: {
    marginLeft: Spacing.xs,
  },
  buttonIcon: {
    marginRight: Spacing.xs,
  },
  contactModalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  modalHeading: {
    color: Colors.darker,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  contactItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
  },
  modalCancelButton: {
    marginTop: Spacing.md,
    width: '100%',
  },
});