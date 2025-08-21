import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateTimer, deleteTimer } from '../services/timersService';
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from '../styles/GlobalStyles';

interface EditTimerModalProps {
  visible: boolean;
  onClose: () => void;
  timerId: string;
  currentName: string;
  currentMinutes: number;
  currentCheckIns: number;
  currentContact: string;
}

const EditTimerModal: React.FC<EditTimerModalProps> = ({
  visible,
  onClose,
  timerId,
  currentName,
  currentMinutes,
  currentCheckIns,
  currentContact
}) => {
  const [name, setName] = useState(currentName);
  const [minutes, setMinutes] = useState(currentMinutes);
  const [checkIns, setCheckIns] = useState(currentCheckIns.toString());
  const [contact, setContact] = useState(currentContact);

  const handleSave = async () => {
    try {
      await updateTimer(timerId, {
        timerName: name,
        minutes,
        checkIns: parseInt(checkIns),
        checkInContact: contact,
      });
      Alert.alert('Success', 'Timer updated!');
      onClose();
    } catch (err) {
      Alert.alert('Error', 'Failed to update timer.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTimer(timerId);
      Alert.alert('Deleted', 'Timer removed.');
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
          value={minutes.toString() || ""}
          keyboardType="numeric"
          placeholder="Minutes"
          onChangeText={(val) => setMinutes(Number(val))}
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

        <TouchableOpacity style={[GlobalStyles.fullWidthButton, Shadows.subtle]} onPress={handleSave}>
          <Text style={GlobalStyles.buttonText}>Save Changes</Text>
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
  deleteButton: {
    backgroundColor: '#FF0000',
    marginTop: Spacing.md,
  },
});
