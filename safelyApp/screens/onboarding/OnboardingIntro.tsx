import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { updateUserOnboardingStatus } from "../../services/userService";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { GlobalStyles, Spacing, Typography } from "../../styles/GlobalStyles";
import { styles } from "../../styles/screenStyles/onboardingStyles/OnboardingIntro.styles";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingIntro">;

export default function OnboardingIntro({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setHasOnboarded } = useAuth();

const handleSkip = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = getAuth().currentUser;
      if (user) {
        await updateUserOnboardingStatus(user.uid, true);
        setHasOnboarded(true);
      } else {
        throw new Error("No authenticated user found");
      }
    } catch (error) {
      console.error("Error updating onboarding status:", error);
      Alert.alert("Error", "Failed to complete onboarding. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


    const handleStartDemo = () => {
    navigation.navigate("OnboardingTimerDemo");
  };

  return (
    <View style={[GlobalStyles.container, GlobalStyles.centered]}>
      <Text style={Typography.heading}>Welcome to Safely!</Text>
      <Text style={[Typography.body, {textAlign: "center", width: "80%"}]}>
        Let’s show you how to use timers and check-ins, or skip if you’d like.
      </Text>

      <TouchableOpacity
        style={[GlobalStyles.fullWidthButton,{marginTop: Spacing.xl}, isLoading && styles.disabledButton]}
        onPress={handleStartDemo}
        disabled={isLoading}
      >
        <Text style={GlobalStyles.buttonText}>Start Demo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[GlobalStyles.outlineButtonFW ,{marginTop: Spacing.md}, isLoading && styles.disabledButton]}
        onPress={handleSkip}
        disabled={isLoading}
      >
        <Text style={GlobalStyles.outlineButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}