import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationPermissionForm = ({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) => {
  return (
    <View>
      <Text style={[Typography.body, { marginBottom: Spacing.md }]}>
        Stay up to date with important updates and alerts.
      </Text>

      <Text style={Typography.muted}>
        Enable push notifications to never miss out.
      </Text>

      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg }]}
        onPress={() => {
          // Ideally, you'd request permission here with Expo Notifications API
          console.log('Notification permission requested');
          onFinish();
        }}
      >
        <Text style={GlobalStyles.buttonText}>Turn on Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationPermissionForm;
