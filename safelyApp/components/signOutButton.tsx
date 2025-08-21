import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../styles/GlobalStyles';
import { logoutUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/componentStyles/signOutButton.styles';
import { NavigationProp } from '../types/componentTypes/RegisterModal.types';

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

