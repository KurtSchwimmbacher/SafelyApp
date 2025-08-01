import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
import { Colors, GlobalStyles, Spacing, Typography } from "../../styles/GlobalStyles";

const OTP_LENGTH = 6;

const PhoneConfirmationForm = ({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // Keep only last digit
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
    <Pressable onPress={Keyboard.dismiss}>
      <Text style={[Typography.body, { marginTop: 24, marginBottom: Spacing.md }]}>
        Enter the code we sent over SMS to your phone number.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TouchableOpacity key={index} onPress={() => inputs.current[index]?.focus()}>
            <TextInput
              ref={(ref) => { inputs.current[index] = ref; }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              returnKeyType="next"
              textAlign="center"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={() => console.log("Send again")}>
        <Text style={[Typography.body, styles.link]}>Didn't get an SMS? Send again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("More options")}>
        <Text style={[Typography.body, styles.link]}>More options</Text>
      </TouchableOpacity>

        <TouchableOpacity
            style={[
                GlobalStyles.fullWidthButton,
                { marginTop: Spacing.xl, width: "100%" },
                otp.includes("") && styles.disabledButton // Apply when disabled
            ]}
            onPress={onContinue}
            disabled={otp.includes("")}
            >
                <Text style={GlobalStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
    </Pressable>
  );
};

export default PhoneConfirmationForm;

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.md,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.midDark,
    borderRadius: Spacing.sm,
    fontSize: 24,
    fontFamily: "JosefinSans_400Regular",
    color: Colors.midDark,
    marginHorizontal: 4,
    backgroundColor: Colors.white,
  },
  disabledButton: {
  backgroundColor: Colors.light, // or any muted color
  opacity: 0.6,
},
  link: {
    marginTop: Spacing.sm,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
