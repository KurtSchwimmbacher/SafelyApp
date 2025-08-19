import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing } from '../styles/GlobalStyles';
import { logoutUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignOutButton = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      navigation.navigate('Landing');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.signOutButton}
      onPress={handleSignOut}
    >
      <MaterialCommunityIcons name="logout" size={32} color={Colors.dark} />
    </TouchableOpacity>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: Colors.lightest,
    padding: Spacing.xs,
    borderRadius: 50,
    marginTop: Spacing.md,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});