import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Colors, Spacing, Typography, Radius, GlobalStyles } from '../styles/GlobalStyles';
import { updateTimer, deleteTimer } from '../services/timersService';

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
  const [minutes, setMinutes] = useState(currentMinutes ? currentMinutes.toString() : '17');
  const [checkIns, setCheckIns] = useState(currentCheckIns ? currentCheckIns.toString() : '0');
  const [contact, setContact] = useState(currentContact || '');

  const handleSave = async () => {
    try {
      const minutesNum = parseInt(minutes);
      const checkInsNum = parseInt(checkIns) || 0;

      if (isNaN(minutesNum) || minutesNum <= 0) {
        Alert.alert('Error', 'Please enter a valid number of minutes greater than 0.');
        return;
      }
      if (checkInsNum < 0) {
        Alert.alert('Error', 'Number of check-ins cannot be negative.');
        return;
      }

      await updateTimer(timerId, {
        timerName: name,
        minutes: minutesNum,
        checkIns: checkInsNum,
        checkInContact: contact,
      });

      Alert.alert('Success', 'Timer updated!');
      await onTimerUpdated();
      onClose();
    } catch (err) {
      Alert.alert('Error', 'Failed to update timer.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTimer(timerId);
      Alert.alert('Success', 'Timer deleted!');
      onTimerDeleted();
      onClose();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete timer.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={[Typography.heading, styles.heading]}>Edit Timer</Text>

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Timer name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          value={minutes}
          keyboardType="numeric"
          placeholder="Minutes"
          onChangeText={setMinutes}
        />
        <TextInput
          style={styles.input}
          value={checkIns}
          keyboardType="numeric"
          placeholder="Check-ins"
          onChangeText={setCheckIns}
        />
        <TextInput
          style={styles.input}
          value={contact}
          placeholder="Check-in contact"
          onChangeText={setContact}
        />

        <TouchableOpacity style={[GlobalStyles.fullWidthButton, styles.updateButton]} onPress={handleSave}>
          <Text style={GlobalStyles.buttonText}>Update Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[GlobalStyles.fullWidthButton, styles.deleteButton]} onPress={handleDelete}>
          <Text style={GlobalStyles.buttonText}>Delete Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text style={{ color: Colors.dark, marginTop: Spacing.md }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditTimerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.lightest,
  },
  heading: {
    marginBottom: Spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.dark,
    padding: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.md,
  },
  updateButton: {
    backgroundColor: Colors.base,
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});