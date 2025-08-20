import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  useFonts as useSpaceGroteskFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingScreen from './screens/LandingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import React from 'react';
import SplashScreen from './screens/SplashScreen';
import DrawerNavigator from './navigation/DrawerNavigation';
import OnboardingIntro from './screens/onboarding/OnboardingIntro';
import OnboardingTimerDemo from './screens/onboarding/OnboardingTimerDemo';
import OnboardingCheckInDemo from './screens/onboarding/OnboardingCheckDemo';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { user, loading, isRegistering, hasOnboarded } = useAuth();
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user || isRegistering ? (
          <Stack.Screen name="Landing" component={LandingScreen} />
        ) : hasOnboarded ? (
          <Stack.Screen name="main" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="OnboardingIntro" component={OnboardingIntro} />
            <Stack.Screen name="OnboardingTimerDemo" component={OnboardingTimerDemo} />
            <Stack.Screen name="OnboardingCheckInDemo" component={OnboardingCheckInDemo} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const [spaceGroteskLoaded] = useSpaceGroteskFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_700Bold,
  });

  const fontsLoaded = interLoaded && spaceGroteskLoaded;

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}