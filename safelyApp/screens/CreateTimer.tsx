import React from 'react';
import CircularTimer from '../components/CircularTimer';
import { SafeAreaView } from 'react-native';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CircularTimer />
    </SafeAreaView>
  );
}
