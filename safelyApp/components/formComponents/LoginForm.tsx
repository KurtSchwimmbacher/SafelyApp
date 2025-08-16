import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { Colors, GlobalStyles, Spacing, Typography, Radius, Shadows } from "../../styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { validateEmail, validatePassword } from "../../services/validationService";

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const login = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError || "",
      password: passwordError || "",
    });

    if (!emailError && !passwordError) {
      try {
        await loginUser(email, password);
        onSuccess();
      } catch (error) {
        setErrors({ general: "Invalid Email or Password" });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Section */}
      <TextInput
        style={[styles.input, Typography.body]}
        placeholder="Enter your email"
        placeholderTextColor={Colors.light}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, Typography.body]}
        placeholder="Enter your password"
        placeholderTextColor={Colors.light}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {errors.general && (
        <Text style={[styles.errorText, { marginTop: Spacing.sm }]}>
          {errors.general}
        </Text>
      )}

      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton, styles.submitButton, Shadows.subtle]}
        onPress={login}
        activeOpacity={0.7}
      >
        <Text style={GlobalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Or Breaker */}
      <View style={styles.orBreaker}>
        <View style={[styles.line, { backgroundColor: Colors.lighter }]} />
        <Text style={[Typography.caption, styles.orText, { color: Colors.dark }]}>
          or
        </Text>
        <View style={[styles.line, { backgroundColor: Colors.lighter }]} />
      </View>

      {/* Social Login Options */}
      <View style={styles.socialButtons}>
        <TouchableOpacity
          style={[styles.socialButton, Shadows.subtle]}
          onPress={() => console.log('Phone pressed')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="phone" size={18} color={Colors.base} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, Shadows.subtle]}
          onPress={() => console.log('Google pressed')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="google" size={18} color={Colors.base} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, Shadows.subtle]}
          onPress={() => console.log('Apple pressed')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="apple" size={18} color={Colors.base} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md, 
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    color: Colors.darker,
    height: 56, 
    lineHeight: 32, 
  },
  errorText: {
    color: '#CC6666',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  submitButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  orBreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
    width: '60%',
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: Spacing.xs,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  socialButton: {
    backgroundColor: Colors.lightest,
    borderRadius: Radius.full,
    padding: Spacing.md,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});