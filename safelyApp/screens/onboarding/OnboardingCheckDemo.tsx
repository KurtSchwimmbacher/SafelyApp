import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn, FadeOut } from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { RootStackParamList } from "../../types/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { updateUserOnboardingStatus } from "../../services/userService";
import { Colors, GlobalStyles, Radius, Shadows, Spacing, Typography } from "../../styles/GlobalStyles"
import Wave from "../../components/Wave";


type Props = NativeStackScreenProps<RootStackParamList, "OnboardingCheckInDemo">;

export default function OnboardingCheckInDemo({ navigation }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const { setHasOnboarded } = useAuth();

  const screenHeight = Dimensions.get("window").height - 200;
  const initialSeconds = 30;
  const translateY = useSharedValue(0);

  useEffect(() => {
    const progress = secondsRemaining / initialSeconds;
    translateY.value = withTiming((1 - progress) * screenHeight, { duration: 1000 });

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCheckIn = () => {
    Alert.alert("Success", "Check-in recorded! You're safe.");
    setCurrentStep(2);
  };

  const handleMissCheckIn = () => {
    Alert.alert("Missed Check-in", "Your contact was notified you missed a check-in.");
    setCurrentStep(3);
  };

  const handleComplete = async () => {
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
      console.error("Error completing onboarding:", error);
      Alert.alert("Error", "Failed to complete onboarding. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { title: "Step 1: Check In", instruction: "Press Check In to confirm you're safe." },
    { title: "Step 2: Missing a Check-in", instruction: "See what happens if you miss a check-in." },
    { title: "Step 3: Finish", instruction: "You're ready to use Safely!" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index + 1 <= currentStep ? styles.progressDotActive : styles.progressDotInactive,
            ]}
          />
        ))}
      </View>

      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
        <Text style={[Typography.subheading, styles.stepTitle]}>{steps[currentStep - 1].title}</Text>
        <Text style={[Typography.body, styles.instruction]}>{steps[currentStep - 1].instruction}</Text>

        {currentStep <= 2 && (
          <Animated.View entering={FadeIn} style={styles.timerContainer}>
            <Animated.View style={[styles.waveContainer, animatedStyle]}>
              <Wave
                color={Colors.base}
                amplitude={25}
                verticalOffset={screenHeight * 0.048}
                opacity={1}
                speed={4000}
                fullHeight={screenHeight}
              />
              <Wave
                color={Colors.base}
                amplitude={30}
                verticalOffset={screenHeight * 0.049}
                opacity={0.7}
                speed={5000}
                fullHeight={screenHeight}
              />
              <Wave
                color={Colors.base}
                amplitude={35}
                verticalOffset={screenHeight * 0.05}
                opacity={0.5}
                speed={6000}
                fullHeight={screenHeight}
              />
            </Animated.View>
            <View style={styles.contentWrapper}>
              <Text style={[styles.countdownText, Typography.heading]}>
                {formatTime(secondsRemaining)}
              </Text>
              <Text style={[styles.nextCheckInText, Typography.body]}>
                Next Check-in: in {secondsRemaining} seconds
              </Text>
            </View>
          </Animated.View>
        )}

        {currentStep === 1 && (
          <Animated.View entering={FadeIn} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[GlobalStyles.fullWidthButton, styles.checkInButton, Shadows.subtle]}
              onPress={handleCheckIn}
            >
              <Text style={[Typography.subheading, GlobalStyles.buttonText]}>Check In</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {currentStep === 2 && (
          <Animated.View entering={FadeIn} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[GlobalStyles.fullWidthButton, styles.missCheckInButton, Shadows.subtle]}
              onPress={handleMissCheckIn}
            >
              <Text style={[Typography.subheading, GlobalStyles.buttonText]}>Simulate Missed Check-in</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {currentStep === 3 && (
          <Animated.View entering={FadeIn} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[GlobalStyles.fullWidthButton, styles.completeButton, Shadows.subtle, isLoading && styles.disabledButton]}
              onPress={handleComplete}
              disabled={isLoading}
            >
              <Text style={[Typography.subheading, GlobalStyles.buttonText]}>Complete</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    marginHorizontal: Spacing.xs,
  },
  progressDotActive: {
    backgroundColor: Colors.base,
  },
  progressDotInactive: {
    backgroundColor: Colors.lighter,
  },
  stepContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightest,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadows.subtle,
  },
  stepTitle: {
    color: Colors.darker,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  instruction: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  timerContainer: {
    width: "110%",
    alignItems: "center",
    position: "relative",
  },
  waveContainer: {
    position: "absolute",
    top: 0,
    left: -8,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  contentWrapper: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: "center",
    width: "100%",
  },
  countdownText: {
    color: Colors.darker,
    marginBottom: Spacing.sm,
    textAlign: "center",
    width: "100%",
  },
  nextCheckInText: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  checkInButton: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  missCheckInButton: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark, 
  },
  completeButton: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
});