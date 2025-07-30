import React, { useState } from 'react';
import { GlobalStyles, Typography, Spacing } from '../styles/GlobalStyles';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

export default function LandingScreen() {
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);

  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.top]}>
      <Text style={[Typography.title, {marginTop: Spacing.lg, marginBottom: 550}]}>Welcome to Safely</Text>

      <TouchableOpacity style={[GlobalStyles.fullWidthButton, {margin: Spacing.lg}]} onPress={() => setModalType('login')}>
        <Text style={GlobalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={GlobalStyles.fullWidthButton} onPress={() => setModalType('register')}>
        <Text style={GlobalStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      <LoginModal visible={modalType === 'login'} onClose={() => setModalType(null)} />
      <RegisterModal visible={modalType === 'register'} onClose={() => setModalType(null)} />
    </SafeAreaView>
  );
}


