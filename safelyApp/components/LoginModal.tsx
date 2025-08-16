import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyles, Radius, Spacing, Typography, Shadows } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginForm from './formComponents/LoginForm';

interface LoginModalProps {
  visible: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose, onSuccess }: LoginModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.content, Shadows.subtle]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.sideSpacer} />
            <Text style={[Typography.heading, styles.headerTitle, { color: Colors.darker }]}>
              Login
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <MaterialCommunityIcons name="close" size={24} color={Colors.dark} />
            </TouchableOpacity>
          </View>

          {/* Login Form */}
          <View style={[GlobalStyles.container, { paddingVertical: Spacing.lg }]}>
            <LoginForm onSuccess={onSuccess} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    minHeight: 550,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderColor: Colors.lighter,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: Spacing.sm,
  },
  sideSpacer: {
    width: 32, 
  },
});