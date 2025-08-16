import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles, Shadows } from '../../styles/GlobalStyles';
import { Switch } from 'react-native-gesture-handler';
import { getAuth } from 'firebase/auth';
import { createUserProfile } from '../../services/userService';
import { useRegisterContext } from '../../contexts/RegisterContext';
import * as Notifications from 'expo-notifications';

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

const NotificationPermissionForm = ({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) => {
  const { registerData, setRegisterData } = useRegisterContext();
  const [personalized, setPersonalized] = useState(true);

  const handleToggle = (value: boolean) => {
    setPersonalized(value);
    setRegisterData({ ...registerData, personalizedNotifications: value });
  };

  const handleFinish = async () => {
    const user = registerData.user;
    if (!user) return;

    try {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });

      const notificationsEnabled = status === 'granted';
      setRegisterData({ ...registerData, notificationsEnabled });

      await createUserProfile({
        uid: user.uid,
        email: user.email ?? '',
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        dateOfBirth: registerData.dateOfBirth,
        phoneNumber: registerData.phoneNumber,
        notifications: personalized,
        notificationsEnabled,
        contactsShared: registerData.contactsShared,
        createdAt: new Date().toISOString(),
      });

      onFinish();
    } catch (error) {
      console.error('Error requesting notifications permission or creating user profile:', error);
      Alert.alert(
        'Error',
        'Failed to set up notifications or save profile. Please try again.',
        [{ text: 'OK', onPress: () => onFinish() }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.subheading, { marginBottom: Spacing.sm, color: Colors.darker, textAlign: 'center' }]}>
        Enable Notifications
      </Text>

      <Text style={[Typography.body, { marginBottom: Spacing.lg, color: Colors.dark, textAlign: 'center' }]}>
        Stay up to date with important updates and alerts from Safely.
      </Text>

      <View style={styles.switchContainer}>
        <Text style={[Typography.caption, { color: Colors.dark, flex: 1, marginRight: Spacing.sm }]}>
          Get personalized recommendations and updates
        </Text>
        <Switch
          value={personalized}
          onValueChange={handleToggle}
          trackColor={{ false: Colors.lighter, true: Colors.base }}
          thumbColor={personalized ? Colors.base : Colors.light}
        />
      </View>

      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, styles.submitButton, Shadows.subtle]}
        onPress={handleFinish}
        activeOpacity={0.7}
      >
        <Text style={GlobalStyles.buttonText}>Yes, Notify Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationPermissionForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.sm,
    padding: Spacing.md,
    marginVertical: Spacing.md,
    justifyContent: 'space-between',
  },
  submitButton: {
    marginTop: Spacing.md,
  },
});