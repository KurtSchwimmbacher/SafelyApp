import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyles, Radius, Spacing, Typography } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RegisterForm from './formComponents/RegisterForm';
import PhoneConfirmationForm from './formComponents/PhoneConfirmationForm';
import NotificationPermissionForm from './formComponents/NotificationPermissionForm';
import FeedbackForm from './formComponents/FeedbackForm';
import FinishSigningUpForm from './formComponents/FinishSigningUpForm';

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RegisterModal({ visible, onClose }: RegisterModalProps) {
    const [step, setStep] = useState<'register' |'confirm' |'details' |'feedback' |'notifications'>('register');

    const stepTitles: Record<typeof step, string> = {
    register: 'Register',
    confirm: 'Confirm Phone',
    details: 'Your Details',
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
                <View style={[styles.content, step === 'notifications' && styles.shortContent]}>

                    {/* header */}
                    <View style={styles.header}>
                        {/* spacer to balance the close icon */}
                        <View style={styles.sideSpacer} />
                        <Text style={[Typography.body, styles.headerTitle, { color: Colors.primaryLight }]}>
                            {stepTitles[step]}
                        </Text>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <MaterialCommunityIcons name="close" size={24} color={Colors.primaryLight} />
                        </TouchableOpacity>
                    </View>

                    {/* Register Form */}
                    <View style={GlobalStyles.container}>
                        <View style={GlobalStyles.container}>
                            {step === 'register' && <RegisterForm onContinue={() => setStep('confirm')} />}
                            {step === 'confirm' && <PhoneConfirmationForm onContinue={() => setStep('details')} />}
                            {step === 'details' && <FinishSigningUpForm onContinue={() => setStep('feedback')} />}
                            {step === 'feedback' && <FeedbackForm onContinue={() => setStep('notifications')} />}
                            {step === 'notifications' && <NotificationPermissionForm onFinish={onClose} />}
                        </View>

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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    minHeight: 800,
    overflow: 'hidden',
  },
  shortContent: {
    minHeight: 400,
  },
  header: {
    height: Spacing.xl*2,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.light,
    paddingHorizontal: Spacing.lg,
  },
  headerTitle:{
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: Spacing.sm,
  },
  sideSpacer: {
  width: 32, // Same width as the close icon area for symmetry
    },
});
