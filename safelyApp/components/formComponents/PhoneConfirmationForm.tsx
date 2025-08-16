import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Pressable } from "react-native";
import { Colors, GlobalStyles, Spacing, Typography, Radius, Shadows } from "../../styles/GlobalStyles";

const OTP_LENGTH = 6;

const PhoneConfirmationForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<(TextInput | null)[]>(Array(OTP_LENGTH).fill(null));

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <Text style={[Typography.subheading, { marginBottom: Spacing.sm, color: Colors.darker }]}>
        Enter the code we sent to your email
      </Text>
      <Text style={[Typography.caption, { marginBottom: Spacing.lg, color: Colors.dark }]}>
        Check your spam folder if you don’t see the email.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TouchableOpacity key={index} onPress={() => inputs.current[index]?.focus()}>
            <TextInput
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[styles.otpInput, Typography.body]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              returnKeyType="next"
              textAlign="center"
              selectionColor={Colors.base}
              textAlignVertical="center"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={() => console.log("Send again")}>
        <Text style={[Typography.caption, styles.link, { color: Colors.base }]}>
          Didn’t get an email? Send again
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("More options")}>
        <Text style={[Typography.caption, styles.link, { color: Colors.base }]}>
          More options
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          GlobalStyles.fullWidthButton,
          styles.submitButton,
          Shadows.subtle,
          otp.includes("") ? styles.disabledButton : null,
        ]}
        onPress={onContinue}
        disabled={otp.includes("")}
        activeOpacity={0.7}
      >
        <Text style={GlobalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default PhoneConfirmationForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.md,
    width: '100%',
  },
  otpInput: {
    width: 44,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    borderRadius: Radius.sm,
    color: Colors.darker,
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.white,
    lineHeight: 24,
    textAlignVertical: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.lighter,
    opacity: 0.6,
  },
  link: {
    marginTop: Spacing.sm,
  },
  submitButton: {
    marginTop: Spacing.xl,
  },
});