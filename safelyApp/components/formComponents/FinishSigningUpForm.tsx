import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles } from '../../styles/GlobalStyles';
import { useRegisterContext } from '../../contexts/RegisterContext';

const FinishSigningUpForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {

    // import context for registration 
    const {registerData, setRegisterData} = useRegisterContext();

    return (
        <View>
            <TextInput
                style={[styles.inputField, { marginTop: 0 , borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 0}]}
                placeholder="First Name"
                value={registerData.firstName}
                onChangeText={text => setRegisterData({firstName: text})}
            />
            <TextInput
                style={[styles.inputField, { marginTop: 0 , borderTopLeftRadius: 0, borderTopRightRadius: 0}]}
                placeholder="LastName"
                value={registerData.lastName}
                onChangeText={text => setRegisterData({lastName: text})}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={registerData.dateOfBirth}
                onChangeText={text => setRegisterData({dateOfBirth: text})}
            />
            <Text style={{ color: Colors.darkLight, fontSize: 12, marginTop: 4, marginLeft: 2 }}>
                This information won’t be shared or made publically visible.
            </Text>

            <TextInput
                style={styles.inputField}
                placeholder="Phone Number"
                keyboardType='phone-pad'
                value={registerData.phoneNumber}
                onChangeText={text => setRegisterData({phoneNumber: text})}
            />
            <Text style={{ color: Colors.darkLight, fontSize: 12, marginTop: 4, marginLeft: 2 }}>
                We'll only contact you for important updates.
            </Text>
    

            <Text style={{ color: Colors.darkLight, fontSize: 12, marginTop: Spacing.xl, marginLeft: 2 }}>
                By selecting Agree and Continue you agree to our
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }} onPress={() => console.log('Terms of Service pressed')}>
                    {' '}Terms of Service{' '}
                </Text>
                and
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }} onPress={() => console.log('Privacy Policy pressed')}>
                    {' '}Privacy Policy.
                </Text>
            </Text>
            <TouchableOpacity
                style={[GlobalStyles.fullWidthButton, {marginTop: Spacing.md, width: '100%' }]}
                onPress={onContinue}
            >
                <Text style={GlobalStyles.buttonText}>Agree and Continue</Text>
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
