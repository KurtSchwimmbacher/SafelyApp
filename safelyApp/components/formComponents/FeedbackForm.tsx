import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FeedbackForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  return (
    <View>
      <Text style={[Typography.body, { marginBottom: Spacing.md }]}>
        Our privacy commitment
      </Text>

      <Text style={[Typography.title, { marginBottom: Spacing.md }]}>
        Safely lets you share & get support 
      </Text>

      <Text style={Typography.body}>
        To ensure you get the best experience, we need to access your contacts and notifications.
      </Text>

      <Text style={[Typography.muted, { marginTop: Spacing.md }]}>
        I agree to share my contact information with Safely to receive updates
      </Text>

      <TouchableOpacity
        style={[GlobalStyles.outlineButtonFW, { marginTop: Spacing.lg, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
        onPress={onContinue}
      >
        <MaterialCommunityIcons name="account-multiple-plus" size={24} color={Colors.primary} style={{ marginRight: 12, }} />
        <Text style={GlobalStyles.outlineButtonText}>Allow Access to Contacts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackForm;
