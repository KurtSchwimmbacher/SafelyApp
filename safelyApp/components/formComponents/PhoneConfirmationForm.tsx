import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, GlobalStyles, Spacing, Typography } from "../../styles/GlobalStyles";

const PhoneConfirmationForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  return (
    <View>
      <Text style={[Typography.body, { marginTop: 24 }]}>
        A code has been sent to your phone number.
      </Text>
      <TextInput
        style={[styles.inputField, { marginTop: Spacing.md }]}
        placeholder="Enter verification code"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg }]}
        onPress={onContinue}
      >
        <Text style={GlobalStyles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneConfirmationForm;

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
    }   
})