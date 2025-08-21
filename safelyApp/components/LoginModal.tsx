import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyles, Radius, Spacing, Typography, Shadows } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginForm from './formComponents/LoginForm';
import { styles } from '../styles/componentStyles/LoginModal.styles';
import { LoginModalProps } from '../types/componentTypes/LoginModal.types';

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
