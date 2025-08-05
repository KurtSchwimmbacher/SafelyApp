import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

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
import LandingScreen from './screens/LandingScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [initialising, setInitialising] = useState(true);

  const [yesevaLoaded] = useYesevaFonts({ YesevaOne_400Regular });
  const [josefinLoaded] = useJosefinFonts({
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  const fontsLoaded = yesevaLoaded && josefinLoaded;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initialising) {
        setInitialising(false);
      }
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded || initialising) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="Landing" component={LandingScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
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
