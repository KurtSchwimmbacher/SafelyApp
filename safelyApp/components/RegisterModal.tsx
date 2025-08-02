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
                <View style={[styles.content, step === 'notifications' && styles.shortContent]}>

                    {/* header */}
                    <View style={styles.header}>
                        {canGoBack ? (
                            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.primaryLight} />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.sideSpacer} />
                        )}

                        <Text style={[Typography.body, styles.headerTitle, { color: Colors.primaryLight }]}>
                            {stepTitles[step]}
                        </Text>

                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close" size={24} color={Colors.primaryLight} />
                        </TouchableOpacity>
                    </View>


                    {/* Register Form */}
                    <View style={GlobalStyles.container}>
                        <View style={GlobalStyles.container}>
                            {step === 'register' &&
                                <RegisterForm 
                                onContinue={() => setStep('confirm')}   
                            />}
                            {step === 'confirm' &&
                                <PhoneConfirmationForm 
                                onContinue={() => setStep('details')} 
                                onBack={()=> setStep('register')}  
                            />}
                            {step === 'details' && 
                                <FinishSigningUpForm 
                                onContinue={() => setStep('feedback')} 
                                onBack={()=> setStep('confirm')}  
                            />}
                            {step === 'feedback' &&
                                <FeedbackForm 
                                onContinue={() => setStep('notifications')} 
                                onBack={()=> setStep('details')}  
                                />}
                            {step === 'notifications' &&
                                <NotificationPermissionForm 
                                onFinish={onClose}
                                onBack={()=> setStep('feedback')}
                            />}
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
    height: Spacing.xl * 2,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.light,
    paddingHorizontal: Spacing.lg,
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
    width: 32, // Same width as icon buttons
    },

});
