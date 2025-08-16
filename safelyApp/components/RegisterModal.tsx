import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Colors, GlobalStyles, Radius, Spacing, Typography, Shadows } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RegisterForm from './formComponents/RegisterForm';
import PhoneConfirmationForm from './formComponents/PhoneConfirmationForm';
import NotificationPermissionForm from './formComponents/NotificationPermissionForm';
import FeedbackForm from './formComponents/FeedbackForm';
import FinishSigningUpForm from './formComponents/FinishSigningUpForm';

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegisterModal({ visible, onClose, onSuccess }: RegisterModalProps) {
  const [step, setStep] = useState<'register' | 'confirm' | 'details' | 'feedback' | 'notifications'>('register');
  const canGoBack = step !== 'register';

  const handleBack = () => {
    switch (step) {
      case 'confirm':
        setStep('register');
        break;
      case 'details':
        setStep('confirm');
        break;
      case 'feedback':
        setStep('details');
        break;
      case 'notifications':
        setStep('feedback');
        break;
    }
  };

  const stepTitles: Record<typeof step, string> = {
    register: 'Register',
    confirm: 'Confirm Email',
    details: 'Finish Signing Up',
    feedback: 'About the App',
    notifications: 'Enable Notifications',
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={styles.keyboardAvoidingContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={[styles.content, step === 'notifications' && styles.shortContent, Shadows.subtle]}>
              {/* Header */}
              <View style={styles.header}>
                {canGoBack ? (
                  <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="chevron-left" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.sideSpacer} />
                )}
                <Text style={[Typography.heading, styles.headerTitle, { color: Colors.darker }]}>
                  {stepTitles[step]}
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>

              {/* Form Content */}
              <View style={[GlobalStyles.container, { paddingVertical: Spacing.lg }]}>
                {step === 'register' && (
                  <RegisterForm onContinue={() => setStep('confirm')} />
                )}
                {step === 'confirm' && (
                  <PhoneConfirmationForm
                    onContinue={() => setStep('details')}
                    onBack={() => setStep('register')}
                  />
                )}
                {step === 'details' && (
                  <FinishSigningUpForm
                    onContinue={() => setStep('feedback')}
                    onBack={() => setStep('confirm')}
                  />
                )}
                {step === 'feedback' && (
                  <FeedbackForm
                    onContinue={() => setStep('notifications')}
                    onBack={() => setStep('details')}
                  />
                )}
                {step === 'notifications' && (
                  <NotificationPermissionForm
                    onFinish={onSuccess}
                    onBack={() => setStep('feedback')}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    minHeight: 500,
  },
  shortContent: {
    minHeight: 350,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: Spacing.sm,
  },
  backButton: {
    padding: Spacing.sm,
  },
  sideSpacer: {
    width: 32,
  },
});