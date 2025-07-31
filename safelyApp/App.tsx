import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateTimer from './screens/CreateTimer';

import {
  useFonts as useYesevaFonts,
  YesevaOne_400Regular,
} from '@expo-google-fonts/yeseva-one';
import {
  useFonts as useJosefinFonts,
  JosefinSans_400Regular,
  JosefinSans_700Bold,
  JosefinSans_300Light,
} from '@expo-google-fonts/josefin-sans';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [yesevaLoaded] = useYesevaFonts({ YesevaOne_400Regular });
  const [josefinLoaded] = useJosefinFonts({
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  const fontsLoaded = yesevaLoaded && josefinLoaded;
  if (!fontsLoaded) return null; 
  
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
      <CreateTimer />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
