import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Colors, GlobalStyles, Spacing, Typography, Radius, Shadows } from "../../styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { validateEmail, validatePassword, validatePasswordsMatch } from "../../services/validationService";
import { useRegisterContext } from '../../contexts/RegisterContext';
import { RegisterFormProps } from "../../types/formTypes/RegisterForm.types";
import { styles } from "../../styles/formStyles/RegisterForm.styles";



const RegisterForm = ({ onContinue }: RegisterFormProps) => {
  const { setRegisterData } = useRegisterContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; general?: string }>({});

  const register = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const passwordMatchError = validatePasswordsMatch(password, confirmPassword);

    setErrors({
      email: emailError || "",
      password: passwordError || "",
      confirmPassword: passwordMatchError || "",
    });

    if (!emailError && !passwordError && !passwordMatchError) {
      try {
        const userCredential = await registerUser(email, password);
        setRegisterData({ user: userCredential.user });
        onContinue();
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

      <TextInput
        style={[styles.input, Typography.body]}
        placeholder="Confirm your password"
        placeholderTextColor={Colors.light}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      {errors.general && (
        <Text style={[styles.errorText, { marginTop: Spacing.sm }]}>
          {errors.general}
        </Text>
      )}

      <TouchableOpacity
        style={[
          GlobalStyles.fullWidthButton,
          styles.submitButton,
          Shadows.subtle,
          (!email || !password ) && styles.disabledButton, // apply disabled style
        ]}
        onPress={register}
        activeOpacity={0.7}
        disabled={!email || !password } // disable until all filled
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

export default RegisterForm;

