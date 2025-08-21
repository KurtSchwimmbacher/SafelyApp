import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Modal, Platform, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile, deleteUserProfile, userProfile } from '../services/userService';
import { deleteCurrentUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from '../styles/GlobalStyles';
import { styles } from '../styles/screenStyles/ProfileScreen.styles';

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profile, setProfile] = useState<userProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [contactsShared, setContactsShared] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; dateOfBirth?: string; phoneNumber?: string; general?: string }>({});

  // Animation for screen/modal fade-in
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    const fetchProfile = async () => {
      if (user?.uid) {
        try {
          const data = await getUserProfile(user.uid);
          setProfile(data);
          if (data) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setDateOfBirth(data.dateOfBirth || '');
            setPhoneNumber(data.phoneNumber || '');
            setNotifications(data.notifications || false);
            setContactsShared(data.contactsShared || false);
          }
        } catch (error) {
          setErrors({ general: 'Failed to load profile.' });
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

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

  const saveButton = createButtonAnimation();
  const deleteButton = createButtonAnimation();
  const confirmButton = createButtonAnimation();
  const cancelButton = createButtonAnimation();

  const validateInputs = () => {
    const newErrors: { firstName?: string; dateOfBirth?: string; phoneNumber?: string } = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (dateOfBirth && !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
      newErrors.dateOfBirth = 'Date of birth must be in YYYY-MM-DD format.';
    }
    if (phoneNumber && !/^\+?\d{10,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format.';
    }
    return newErrors;
  };

  const handleSave = async () => {
    if (!user?.uid || !profile) return;
    const newErrors = validateInputs();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSaving(true);
      try {
        const updates: Partial<userProfile> = {
          firstName,
          lastName,
          dateOfBirth,
          phoneNumber,
          notifications,
          contactsShared,
        };
        await updateUserProfile(user.uid, updates);
        const updatedProfile = await getUserProfile(user.uid);
        setProfile(updatedProfile);
        Alert.alert('Success', 'Profile updated!');
      } catch (error) {
        setErrors({ general: 'Failed to update profile.' });
      }
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!user?.uid) return;
    setIsDeleting(true);
    try {
      await deleteUserProfile(user.uid);
      await deleteCurrentUser();
      Alert.alert('Success', 'Account deleted.');
      navigation.navigate('Login' as never);
    } catch (error) {
      setErrors({ general: 'Failed to delete account.' });
    }
    setIsDeleting(false);
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[Typography.body, { color: Colors.dark }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[Typography.body, { color: Colors.dark }]}>No profile found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.content, animatedStyle]}>
          <Text style={[Typography.heading, styles.heading]}>User Profile</Text>

          <View style={styles.field}>
            <Text style={[Typography.caption, styles.label]}>Email</Text>
            <Text style={[Typography.body, styles.value]}>{profile.email}</Text>
          </View>

          <TextInput
            style={[styles.input, Typography.body, errors.firstName ? styles.inputError : {}]}
            placeholder="First Name"
            placeholderTextColor={Colors.light}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            style={[styles.input, Typography.body, errors.firstName ? styles.inputError : {}]}
            placeholder="Last Name"
            placeholderTextColor={Colors.light}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />

          <TextInput
            style={[styles.input, Typography.body, errors.dateOfBirth ? styles.inputError : {}]}
            placeholder="Date of Birth (YYYY-MM-DD)"
            placeholderTextColor={Colors.light}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
          {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}

          <TextInput
            style={[styles.input, Typography.body, errors.phoneNumber ? styles.inputError : {}]}
            placeholder="Phone Number"
            placeholderTextColor={Colors.light}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

          <View style={styles.toggleField}>
            <Text style={[Typography.caption, styles.label]}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.lighter, true: Colors.base }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.lighter}
            />
          </View>

          <View style={styles.toggleField}>
            <Text style={[Typography.caption, styles.label]}>Share Contacts</Text>
            <Switch
              value={contactsShared}
              onValueChange={setContactsShared}
              trackColor={{ false: Colors.lighter, true: Colors.base }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.lighter}
            />
          </View>

          {errors.general && <Text style={[styles.errorText, { marginTop: Spacing.sm }]}>{errors.general}</Text>}

          <View style={styles.buttonContainer}>
            <Animated.View style={[GlobalStyles.fullWidthButton, styles.saveButton, saveButton.animatedButtonStyle, Shadows.subtle, isSaving && styles.disabledButton]}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={handleSave}
                onPressIn={saveButton.onPressIn}
                onPressOut={saveButton.onPressOut}
                activeOpacity={0.7}
                disabled={isSaving}
              >
                <MaterialCommunityIcons name="content-save" size={18} color={Colors.white} style={styles.buttonIcon} />
                <Text style={[GlobalStyles.buttonText, styles.buttonText]}>{isSaving ? 'Saving...' : 'Save Changes'}</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[GlobalStyles.fullWidthButton, styles.deleteButton, deleteButton.animatedButtonStyle, Shadows.subtle, isDeleting && styles.disabledButton]}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => setShowDeleteModal(true)}
                onPressIn={deleteButton.onPressIn}
                onPressOut={deleteButton.onPressOut}
                activeOpacity={0.7}
                disabled={isDeleting}
              >
                <MaterialCommunityIcons name="trash-can" size={18} color={Colors.white} style={styles.buttonIcon} />
                <Text style={[GlobalStyles.buttonText, styles.buttonText]}>Delete Account</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </SafeAreaView>

      <Modal
        visible={showDeleteModal}
        animationType="slide"
        transparent={Platform.select({ web: true, default: false })}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <Text style={[Typography.heading, styles.modalHeading]}>Confirm Deletion</Text>
            <Text style={[Typography.body, styles.modalText]}>
              Are you sure you want to delete your account? This action cannot be undone.
            </Text>

            <View style={styles.buttonContainer}>
              <Animated.View style={[GlobalStyles.fullWidthButton, styles.confirmButton, confirmButton.animatedButtonStyle, Shadows.subtle, isDeleting && styles.disabledButton]}>
                <TouchableOpacity
                  style={styles.buttonContent}
                  onPress={handleDelete}
                  onPressIn={confirmButton.onPressIn}
                  onPressOut={confirmButton.onPressOut}
                  activeOpacity={0.7}
                  disabled={isDeleting}
                >
                  <MaterialCommunityIcons name="check" size={18} color={Colors.white} style={styles.buttonIcon} />
                  <Text style={[GlobalStyles.buttonText, styles.buttonText]}>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</Text>
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
                onPress={() => setShowDeleteModal(false)}
                onPressIn={cancelButton.onPressIn}
                onPressOut={cancelButton.onPressOut}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="close-circle" size={18} color={Colors.base} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;