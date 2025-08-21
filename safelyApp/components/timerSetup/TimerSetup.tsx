import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import * as Contacts from 'expo-contacts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from '../../styles/GlobalStyles';
import CheckInSelector from './CheckInSelector';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerSetupProps } from '../../types/timerSetupTypes/TimerSetup.types';
import { styles } from '../../styles/timerSetupStyles/TimerSetup.styles';



const TimerSetup: React.FC<TimerSetupProps> = ({
  minutes,
  timerName,
  checkIns,
  checkInContact,
  setMinutes,
  setTimerName,
  setCheckIns,
  setCheckInContact,
  handleSaveTimer,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  // Fetch contacts on mount
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setContacts(data);
      }
    })();
  }, []);

  const selectContact = (contact: Contacts.Contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      setCheckInContact(contact.phoneNumbers[0].number ?? '');
    }
    setModalVisible(false);
  };

  // Update minutes with clamping (0-60)
  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  // Dynamic SVG size based on screen width
  const windowWidth = Dimensions.get('window').width;
  const circleSize = windowWidth * 0.65;

  return (
    <View style={[{width:'100%',gap: Spacing.xl *1.5}, styles.container]}>
        <TextInput
          style={[styles.input, Typography.body]}
          placeholder="Timer Name"
          placeholderTextColor={Colors.light}
          value={timerName}
          onChangeText={setTimerName}
          textAlignVertical="center"
        />

        <View style={styles.circleContainer}>
          <TouchableOpacity
            style={[styles.circleButton, Shadows.subtle]}
            onPress={() => updateMinutes(-1)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="minus" size={32} color={Colors.white} />
          </TouchableOpacity>
          <Svg height={circleSize} width={circleSize} viewBox="0 0 200 200">
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke={Colors.darker}
              strokeWidth="20"
              fill="none"
            />
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke={Colors.base}
              strokeWidth="20"
              fill="none"
              strokeDasharray={[2 * Math.PI * 90 * (minutes / 60), 2 * Math.PI * 90]}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
            <SvgText
              x="100"
              y="100"
              textAnchor="middle"
              dy=".3em"
              fill={Colors.darker}
              fontSize={48}
              fontFamily="SpaceGrotesk_400Regular"
            >
              {minutes}
            </SvgText>
            <SvgText
              x="100"
              y="140"
              textAnchor="middle"
              fill={Colors.dark}
              fontSize={18}
              fontFamily="Inter_400Regular"
            >
              Minutes
            </SvgText>
          </Svg>
          <TouchableOpacity
            style={[styles.circleButton, Shadows.subtle]}
            onPress={() => updateMinutes(1)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="plus" size={32} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* checkin selector */}
        <CheckInSelector checkIns={parseInt(checkIns) || 0} setCheckIns={(num) => setCheckIns(num.toString())} />


        <TouchableOpacity
          style={[GlobalStyles.fullWidthButton, styles.contactButton, Shadows.subtle]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={[Typography.body, { color: checkInContact ? Colors.darker : Colors.light }]}>
            {checkInContact || 'Select Check-in Contact'}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <Text style={[Typography.heading, styles.modalHeading]}>
              Select a Contact
            </Text>
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
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={GlobalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <TouchableOpacity
          style={[GlobalStyles.fullWidthButton, styles.saveButton, Shadows.subtle, (!timerName) && styles.disabledButton, ]}
          onPress={handleSaveTimer}
          activeOpacity={0.7}
          disabled={!timerName} 
        >
          <Text style={GlobalStyles.buttonText}>Save Timer</Text>
        </TouchableOpacity>
    </View>
  );
};

export default TimerSetup;

