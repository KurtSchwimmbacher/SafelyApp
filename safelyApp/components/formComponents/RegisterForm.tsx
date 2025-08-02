import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native"
import { Colors, GlobalStyles, Spacing, Typography } from "../../styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { registerUser } from "../../services/authService";

interface RegisterFormProps {
  onContinue: () => void;
}

const RegisterForm = ({onContinue}: RegisterFormProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // TODO: Add password validation and confirmation logic
    
    // replace with context && fix issue where user has to login every time
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async () => {
        try {
            await registerUser(email, password);
            setIsLoggedIn(true);
            // replace with navigate to home screen
            console.log('Registration successful');
            onContinue(); // Call the onContinue prop to proceed after registration
        } catch (error) {
            console.log('Registration failed:', error);
        }
    }

    return (
        <View style={GlobalStyles.container}>
            {/* main section */}
            <TextInput
                style={styles.inputField}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={newText => setEmail(newText)}
                defaultValue={email}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={newText => setConfirmPassword(newText)}
                defaultValue={confirmPassword}
            />

            <TouchableOpacity style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg, width: '100%' }]}
                onPress={register}>
                <Text style={GlobalStyles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* or breaker */}
            <View style={styles.orBreaker}>
                <View style={styles.line} />
                <Text style={[Typography.muted ,styles.orText]}>or</Text>
                <View style={styles.line} />
            </View>

            {/* continue with other options section */}
            {/* phone */}
            <TouchableOpacity style={[GlobalStyles.outlineButtonFW, { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
                onPress={() => console.log('phone pressed')}>
                <MaterialCommunityIcons name="phone" size={24} color={Colors.primary} style={{ marginRight: 16  }} />
                <Text style={GlobalStyles.outlineButtonText}>Continue with Phone</Text>
            </TouchableOpacity>

            {/* Google */}
            <TouchableOpacity style={[GlobalStyles.outlineButtonFW, {marginTop: Spacing.md, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
                onPress={() => console.log('google pressed')}>
                <MaterialCommunityIcons name="google" size={24} color={Colors.primary} style={{ marginRight: 16  }} />
                <Text style={GlobalStyles.outlineButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={[GlobalStyles.outlineButtonFW, {marginTop: Spacing.md, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
                onPress={() => console.log('apple pressed')}>
                <MaterialCommunityIcons name="apple" size={24} color={Colors.primary} style={{ marginRight: 16  }} />
                <Text style={GlobalStyles.outlineButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
            
        </View>
    )

}

export default RegisterForm;

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
    orBreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.darkLight,
    },
    orText: {
        marginHorizontal: 10,
    },
   
})