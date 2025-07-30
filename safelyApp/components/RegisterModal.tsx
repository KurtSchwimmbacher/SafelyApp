import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RegisterModal({ visible, onClose }: RegisterModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Register</Text>
          {/* Add your register form here */}
          <Pressable onPress={onClose}>
            <Text style={styles.link}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    color: '#1e90ff',
    marginTop: 20,
  },
});
