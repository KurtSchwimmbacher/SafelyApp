import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Radius, GlobalStyles } from '../styles/GlobalStyles';

interface EditTimerModalProps {
  visible: boolean;
  onClose: () => void;
  currentName: string;
  currentMinutes: number | undefined;
  currentCheckIns: number;
  currentContact: string;
}

const EditTimerModal: React.FC<EditTimerModalProps> = ({
  visible,
  onClose,
  currentName,
  currentMinutes,
  currentCheckIns,
  currentContact,
}) => {
  const [name, setName] = useState(currentName || '');
  const [minutes, setMinutes] = useState(currentMinutes ? currentMinutes.toString() : '17');
  const [checkIns, setCheckIns] = useState(currentCheckIns ? currentCheckIns.toString() : '0');
  const [contact, setContact] = useState(currentContact || '');

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

        <TouchableOpacity style={[GlobalStyles.fullWidthButton, styles.updateButton]}>
          <Text style={GlobalStyles.buttonText}>Update Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[GlobalStyles.fullWidthButton, styles.deleteButton]}>
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