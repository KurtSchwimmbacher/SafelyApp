import React, { useState } from 'react';
import { GlobalStyles, Typography, Spacing } from '../styles/GlobalStyles';
import { View, Text, TouchableOpacity} from 'react-native';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { RegisterProvider } from '../contexts/RegisterContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LandingScreen() {
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLoginSuccess = () =>{
    console.log("Login / sign up success")
    // close modal
    setModalType(null);
  }

  return (
    <RegisterProvider>
      <SafeAreaView style={[GlobalStyles.container, GlobalStyles.top]}>
        <Text style={[Typography.title, {marginTop: Spacing.lg, marginBottom: 550}]}>Welcome to Safely</Text>

        <TouchableOpacity style={[GlobalStyles.fullWidthButton, {margin: Spacing.lg}]} onPress={() => setModalType('login')}>
          <Text style={GlobalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={GlobalStyles.fullWidthButton} onPress={() => setModalType('register')}>
          <Text style={GlobalStyles.buttonText}>Register</Text>
        </TouchableOpacity>

        <LoginModal 
          visible={modalType === 'login'} 
          onClose={() => setModalType(null)} 
          onSuccess={handleLoginSuccess}
          />

        <RegisterModal 
          visible={modalType === 'register'} 
          onClose={() => setModalType(null)} 
          onSuccess={handleLoginSuccess}/>
      </SafeAreaView>
    </RegisterProvider>
    
  );
}


