import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles, Shadows } from '../../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRegisterContext } from '../../contexts/RegisterContext';
import * as Contacts from 'expo-contacts';

interface RegisterData {
  user?: { uid: string; email?: string | null };
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  contactsShared?: boolean;
  personalizedNotifications?: boolean;
  notificationsEnabled?: boolean;
}

const FeedbackForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  const { registerData, setRegisterData } = useRegisterContext();

  const setContacts = async () => {
    try {
      console.log('Checking contacts permission status...');
      const { status, canAskAgain } = await Contacts.getPermissionsAsync();
      console.log('Current permission status:', status, 'Can ask again:', canAskAgain);

      if (status === 'granted') {
        console.log('Contacts permission already granted');
        setRegisterData({ ...registerData, contactsShared: true });
        onContinue();
        return;
      }

      if (!canAskAgain) {
        console.log('Cannot ask for permission again, directing to settings');
        Alert.alert(
          'Permission Denied',
          'Access to contacts was previously denied. Please enable it in your device settings.',
          [{ text: 'OK', onPress: () => onContinue() }]
        );
        return;
      }

      console.log('Requesting contacts permission...');
      const { status: newStatus } = await Contacts.requestPermissionsAsync();
      console.log('New permission status:', newStatus);

      if (newStatus === 'granted') {
        setRegisterData({ ...registerData, contactsShared: true });
        onContinue();
      } else {
        Alert.alert(
          'Permission Denied',
          'Access to contacts was denied. You can enable it later in settings.',
          [{ text: 'OK', onPress: () => onContinue() }]
        );
      }
    } catch (error) {
      console.error('Error handling contacts permission:', error);
      Alert.alert(
        'Error',
        'Failed to request contacts permission. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.subheading, { marginBottom: Spacing.sm, color: Colors.darker }]}>
        Safely Privacy Commitment
      </Text>

      <Text style={[Typography.body, { marginBottom: Spacing.md, color: Colors.dark }]}>
        To ensure you get the best experience, we need access to your contacts and notifications.
      </Text>

      <Text style={[Typography.caption, { marginBottom: Spacing.lg, color: Colors.dark }]}>
        We’ll use your contacts to help you connect with others and provide personalized support. Your data is secure and won’t be shared without your consent.
      </Text>

      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, styles.submitButton, Shadows.subtle]}
        onPress={setContacts}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="account-multiple-plus" size={20} color={Colors.white} style={styles.buttonIcon} />
        <Text style={GlobalStyles.buttonText}>Allow Access to Contacts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
});