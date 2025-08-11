import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import * as Contacts from 'expo-contacts';
import { Colors, GlobalStyles, Spacing, Typography } from '../styles/GlobalStyles';

interface TimerSetupProps {
  minutes: number;
  timerName: string;
  checkIns: string;
  checkInContact: string;
  setMinutes: (minutes: number) => void;
  setTimerName: (name: string) => void;
  setCheckIns: (checkIns: string) => void;
  setCheckInContact: (contact: string) => void;
  handleSaveTimer: () => Promise<void>;
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

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

  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  const selectContact = (contact: Contacts.Contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      setCheckInContact(contact.phoneNumbers[0].number ?? '');
    }
    setModalVisible(false);
  };

  return (
    <View style={[GlobalStyles.container, { width: '100%', alignItems: 'center' }]}>
      <TextInput
        style={[styles.input, { marginBottom: 5 }]}
        placeholder="Timer Name"
        value={timerName}
        onChangeText={setTimerName}
      />

      <Svg height="250" width="250" viewBox="0 0 200 200">
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
          stroke={Colors.primary}
          strokeWidth="20"
          fill="none"
          strokeDasharray={[2 * Math.PI * 90 * (minutes / 60), 2 * Math.PI * 90]}
          strokeDashoffset={(-0.25 * 2 * Math.PI * 270)}
        />
        <Text style={styles.timerText}>
          {minutes}
          {'\n'}
          <Text style={styles.timerUnit}>Minutes</Text>
        </Text>
      </Svg>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => updateMinutes(-1)}>
          <Text style={GlobalStyles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateMinutes(1)}>
          <Text style={GlobalStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, { marginBottom: 10 }]}
        placeholder="Number of Check-ins"
        value={checkIns}
        onChangeText={setCheckIns}
        keyboardType="number-pad"
      />

      {/* Contact Selection Button */}
      <TouchableOpacity
        style={[styles.input, { justifyContent: 'center' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: checkInContact ? Colors.midDark : Colors.darkLight }}>
          {checkInContact || 'Select Check-in Contact'}
        </Text>
      </TouchableOpacity>

      {/* Built-in React Native Modal */}
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
          <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.md }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={GlobalStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
