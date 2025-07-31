import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FeedbackForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  return (
    <View>
      <Text style={[Typography.body, { marginBottom: Spacing.md }]}>
        We use your contacts to help you connect with friends already using the app.
      </Text>

      <Text style={Typography.muted}>
        We’ll never spam or share your contact data.
      </Text>

      <TouchableOpacity
        style={[GlobalStyles.outlineButtonFW, { marginTop: Spacing.lg }]}
        onPress={onContinue}
      >
        <MaterialCommunityIcons name="account-multiple-plus" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
        <Text style={GlobalStyles.outlineButtonText}>Allow Access to Contacts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackForm;
