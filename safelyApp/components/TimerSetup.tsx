import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import * as Contacts from 'expo-contacts';
import { Colors, GlobalStyles, Spacing, Typography } from '../styles/GlobalStyles';
import CircularKnob from './CircularKnob';

interface TimerSetupProps {
  minutes: number; // Timer duration in minutes
  timerName: string; // Name of the timer
  checkIns: string; // Number of check-ins as a string (to handle text input)
  checkInContact: string; // Selected contact for check-ins
  setMinutes: (minutes: number) => void; // State setter for minutes
  setTimerName: (name: string) => void; // State setter for timer name
  setCheckIns: (checkIns: string) => void; // State setter for number of check-ins
  setCheckInContact: (contact: string) => void; // State setter for contact
  handleSaveTimer: () => Promise<void>; // Function to save the timer
}

const TimerSetup: React.FC<TimerSetupProps> = ({
  minutes,
  timerName,
  checkIns,
  checkInContact,
  setMinutes,
  setTimerName,
  setCheckIns,
  setCheckInContact,
  handleSaveTimer
}) => {
  // State for showing/hiding the contact selection modal
  const [isModalVisible, setModalVisible] = useState(false);

  // State to store the list of contacts fetched from the device
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  // Fetch contacts when component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers], // Include phone numbers
        });
        setContacts(data); // Save contact list to state
      }
    })();
  }, []);

  // Update minutes by a given change (e.g., +1 or -1), clamping between 0 and 60
  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  // When a contact is selected from the modal
  const selectContact = (contact: Contacts.Contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      setCheckInContact(contact.phoneNumbers[0].number ?? '');
    }
    setModalVisible(false); // Close modal
  };

  return (
    <View style={[GlobalStyles.container, { width: '100%', alignItems: 'center' }]}>
      {/* Timer name input */}
      <TextInput
        style={[styles.input, { marginBottom: 5 }]}
        placeholder="Timer Name"
        value={timerName}
        onChangeText={setTimerName}
      />

      {/* Circular timer visualization */}
      <View style={styles.sliderContainer}>
        <CircularKnob value={minutes} onChange={(value) => setMinutes(Math.round(value))} />
      </View>

      {/* Number of check-ins input */}
      <TextInput
        style={[styles.input, { marginBottom: 10 }]}
        placeholder="Number of Check-ins"
        value={checkIns}
        onChangeText={setCheckIns}
        keyboardType="number-pad"
      />

      {/* Contact selection field (opens modal) */}
      <TouchableOpacity
        style={[styles.input, { justifyContent: 'center' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: checkInContact ? Colors.midDark : Colors.darkLight }}>
          {checkInContact || 'Select Check-in Contact'}
        </Text>
      </TouchableOpacity>

      {/* Modal for selecting a contact */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Contact</Text>
          <FlatList
            data={contacts}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => selectContact(item)}
              >
                <Text style={styles.contactName}>{item.name}</Text>
                {item.phoneNumbers?.[0]?.number && (
                  <Text style={styles.contactNumber}>
                    {item.phoneNumbers[0].number}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
          {/* Cancel button to close modal */}
          <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.md }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={GlobalStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Save button */}
      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg, width: '100%' }]}
        onPress={handleSaveTimer}
      >
        <Text style={GlobalStyles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerSetup;

const styles = StyleSheet.create({
  timerText: {
    ...Typography.title,
    fontSize: 48,
    top: '130%',
    textAlign: 'center',
    color: Colors.black,
  },
  sliderContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  timerUnit: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginTop: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.midDark,
    borderRadius: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    marginTop: Spacing.md,
    width: '80%',
    fontSize: Spacing.md,
    color: Colors.midDark,
    fontFamily: 'JosefinSans_400Regular',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: Spacing.md,
  },
  modalTitle: {
    ...Typography.title,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  contactItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkLight,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactNumber: {
    fontSize: 14,
    color: Colors.midDark,
  },
});
