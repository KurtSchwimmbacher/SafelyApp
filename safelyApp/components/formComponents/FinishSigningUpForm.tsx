import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';

const FinishSigningUpForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  return (
    <View>
      <TextInput
        style={styles.inputField}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Date of Birth (YYYY-MM-DD)"
      />
      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg }]}
        onPress={onContinue}
      >
        <Text style={GlobalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishSigningUpForm;

const styles = StyleSheet.create({
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.midDark,
    marginTop: Spacing.md,
    paddingHorizontal: 10,
    fontFamily: 'JosefinSans_400Regular',
    fontSize: Spacing.md,
    borderRadius: Spacing.sm,
    color: Colors.midDark,
  },
});
