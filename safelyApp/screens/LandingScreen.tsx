import React, { useState } from 'react';
import { GlobalStyles, Typography, Spacing, Shadows, Colors } from '../styles/GlobalStyles';
import { View, Text, TouchableOpacity, SafeAreaView, PixelRatio } from 'react-native';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { RegisterProvider } from '../contexts/RegisterContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function LandingScreen() {
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLoginSuccess = () => {
    console.log("Login / sign up success");
    setModalType(null);
  };

  return (
    <RegisterProvider>
      <SafeAreaView style={[GlobalStyles.container, GlobalStyles.centered]}>
        <View style={{ alignItems: 'center', marginVertical: Spacing.xl }}>
          <Text style={[Typography.heading, { fontSize: PixelRatio.getFontScale() * 32, marginBottom: Spacing.sm }]}>
            Welcome to Safely
          </Text>
          <Text style={[Typography.caption, { textAlign: 'center', maxWidth: '85%', color: Colors.dark }]}>
            {/* TODO: update copy */}
            Create timers and stay connected with seamless check-ins.
          </Text>
        </View>

        <View style={{ width: '100%', alignItems: 'center', marginTop: Spacing.xl }}>
          <TouchableOpacity
            style={[GlobalStyles.fullWidthButton, { marginBottom: Spacing.sm }]}
            onPress={() => setModalType('login')}
            activeOpacity={0.7}
          >
            <Text style={GlobalStyles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[GlobalStyles.outlineButtonFW, Shadows.subtle]}
            onPress={() => setModalType('register')}
            activeOpacity={0.7}
          >
            <Text style={GlobalStyles.outlineButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <LoginModal
          visible={modalType === 'login'}
          onClose={() => setModalType(null)}
          onSuccess={handleLoginSuccess}
        />

        <RegisterModal
          visible={modalType === 'register'}
          onClose={() => setModalType(null)}
          onSuccess={handleLoginSuccess}
        />
      </SafeAreaView>
    </RegisterProvider>
  );
}