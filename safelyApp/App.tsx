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
import HomeScreen from './screens/HomeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null; // Or show a splash screen

  return (
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
  );
}

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
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
