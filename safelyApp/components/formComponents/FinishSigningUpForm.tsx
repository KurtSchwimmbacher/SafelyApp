import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles, Shadows } from '../../styles/GlobalStyles';
import { useRegisterContext } from '../../contexts/RegisterContext';
import { styles } from '../../styles/formStyles/FinishSigningUpForm.styles';


const FinishSigningUpForm = ({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) => {
  const { registerData, setRegisterData } = useRegisterContext();

  return (
    <View style={styles.container}>
      <Text style={[Typography.caption, { color: Colors.lighter, marginTop: Spacing.xs, alignSelf: 'center' }]}>
        This information won’t be shared or made publicly visible.
      </Text>

      <View style={styles.nameContainer}>
        <TextInput
          style={[styles.input, Typography.body]}
          placeholder="First Name"
          placeholderTextColor={Colors.light}
          value={registerData.firstName || ''}
          onChangeText={text => setRegisterData({ ...registerData, firstName: text })}
          autoCapitalize="words"
          textAlignVertical="center"
        />
        <TextInput
          style={[styles.input, Typography.body, { borderTopWidth: 0 }]}
          placeholder="Last Name"
          placeholderTextColor={Colors.light}
          value={registerData.lastName || ''}
          onChangeText={text => setRegisterData({ ...registerData, lastName: text })}
          autoCapitalize="words"
          textAlignVertical="center"
        />
      </View>

      <TextInput
        style={[styles.input, Typography.body]}
        placeholder="Date of Birth (YYYY-MM-DD)"
        placeholderTextColor={Colors.light}
        value={registerData.dateOfBirth || ''}
        onChangeText={text => setRegisterData({ ...registerData, dateOfBirth: text })}
        textAlignVertical="center"
      />


      <TextInput
        style={[styles.input, Typography.body]}
        placeholder="Phone Number"
        placeholderTextColor={Colors.light}
        keyboardType="phone-pad"
        value={registerData.phoneNumber || ''}
        onChangeText={text => setRegisterData({ ...registerData, phoneNumber: text })}
        textAlignVertical="center"
      />

      <Text style={[Typography.caption, { color: Colors.dark, marginTop: Spacing.lg, alignSelf: 'flex-start' }]}>
        By selecting Agree and Continue, you agree to our{' '}
        <Text
          style={{ color: Colors.base, fontFamily: 'Inter_500Medium' }}
          onPress={() => console.log('Terms of Service pressed')}
        >
          Terms of Service
        </Text>{' '}
        and{' '}
        <Text
          style={{ color: Colors.base, fontFamily: 'Inter_500Medium' }}
          onPress={() => console.log('Privacy Policy pressed')}
        >
          Privacy Policy
        </Text>.
      </Text>

      <TouchableOpacity
        style={[
          GlobalStyles.fullWidthButton,
          styles.submitButton,
          Shadows.subtle,
          { marginTop: Spacing.xl, marginBottom: Spacing.xl * 1.5 },
          (!registerData.firstName ||
            !registerData.lastName ||
            !registerData.dateOfBirth ||
            !registerData.phoneNumber) && styles.disabledButton, // disabled style
        ]}
        onPress={onContinue}
        activeOpacity={0.7}
        disabled={
          !registerData.firstName ||
          !registerData.lastName ||
          !registerData.dateOfBirth ||
          !registerData.phoneNumber
        } // disable until all filled
      >
        <Text style={GlobalStyles.buttonText}>Agree and Continue</Text>
      </TouchableOpacity>

    </View>
  );
};

export default FinishSigningUpForm;

