import React, { useState } from 'react';
import { GlobalStyles, Typography, Spacing } from '../styles/GlobalStyles';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import CircularTimer from '../components/CircularTimer';


export default function LandingScreen() {
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <CircularTimer />
    </SafeAreaView>
  );
}


