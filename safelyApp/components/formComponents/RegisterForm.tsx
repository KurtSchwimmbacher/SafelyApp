import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native"
import { Colors, GlobalStyles, Spacing, Typography } from "../../styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const RegisterForm = () => {

    return (
        <View style={GlobalStyles.container}>
            {/* main section */}
            <TextInput
                style={styles.inputField}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                // onChangeText={newText => setEmail(newText)}
                // defaultValue={email}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={true}
                // onChangeText={newText => setEmail(newText)}
                // defaultValue={email}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Confirm Password"
                secureTextEntry={true}
                // onChangeText={newText => setEmail(newText)}
                // defaultValue={email}
            />

            <TouchableOpacity style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg, width: '100%' }]}
                onPress={() => console.log('Login pressed')}>
                <Text style={GlobalStyles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* or breaker */}
            <View style={styles.orBreaker}>
                <View style={styles.line} />
                <Text style={[Typography.muted ,styles.orText]}>or</Text>
                <View style={styles.line} />
            </View>

            {/* continue with other options section */}
            {/* Email */}
            <TouchableOpacity style={[GlobalStyles.outlineButtonFW, { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
                onPress={() => console.log('email pressed')}>
                <MaterialCommunityIcons name="email" size={24} color={Colors.primary} style={{ marginRight: 16  }} />
                <Text style={GlobalStyles.outlineButtonText}>Continue with Email</Text>
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