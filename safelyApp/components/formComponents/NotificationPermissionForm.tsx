import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';
import { Switch } from 'react-native-gesture-handler';
import { getAuth } from 'firebase/auth';
import { createUserProfile } from '../../services/userService';
import { useRegisterContext } from '../../contexts/RegisterContext';

const NotificationPermissionForm = ({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) => {

  // import context for registration 
  const {registerData, setRegisterData} = useRegisterContext();

  const [personalized, setPersonalized] = useState(true);

  const handleToggle = (value: boolean) => {
    setPersonalized(value);
    setRegisterData({ personalizedNotifications: value });
  };


  const handleFinish = async () => {
  const user = getAuth().currentUser;

  if(!user) return;
    try {
      await createUserProfile({
        uid: user.uid,
        email: user.email ?? '',
        firstName: registerData.firstName, 
        lastName: registerData.lastName,
        dateOfBirth: registerData.dateOfBirth,
        phoneNumber: registerData.phoneNumber,
        notifications: personalized,
        contactsShared: registerData.contactsShared,
        createdAt: new Date().toISOString(), 
      });

      onFinish();
    } catch (error) {
      console.log("Failed to store user profile", error);
    }

  }

  return (
    <View>

        <Text style={[Typography.title, { marginBottom: Spacing.md, textAlign: 'center' }]}>
            Enable Notifications
        </Text>

        <Text style={[Typography.body, { marginBottom: Spacing.md, textAlign: 'center' }]}>
            Stay up to date with important updates and alerts.
        </Text>
    
        <View style={styles.bar}>
            <Text style={styles.barText}>Get personalised recommendations and more</Text>
            <Switch
                value={personalized}
                onValueChange={handleToggle}
                trackColor={{ false: Colors.light, true: Colors.primaryLight }}
                thumbColor={personalized ? Colors.primary : Colors.light}
            />
        </View>

        <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg, width: '100%' }]}
            onPress={() => {
            //  request permission here with Expo Notifications API
            console.log('Notification permission requested');
            handleFinish();
            }}
        >
            <Text style={GlobalStyles.buttonText}>Yes, notify me</Text>
        </TouchableOpacity>
    </View>
  );
};

export default NotificationPermissionForm;

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightest,
    borderRadius: Spacing.sm,
    padding: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    justifyContent: 'space-between',
  },
  barText: {
    flex: 1,
    color: Colors.midDark,
    fontSize: 16,
    marginRight: 12,
  },
});