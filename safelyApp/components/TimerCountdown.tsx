import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Wave from './Wave';
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from '../styles/GlobalStyles';

interface TimerCountdownProps {
  secondsRemaining: number;
  initialSeconds: number;
  nextCheckIn: number | null;
  nextCheckInTime: string | null;
  showCheckInButton: boolean;
  formatTime: (seconds: number) => string;
  handleCheckIn: () => void;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  secondsRemaining,
  initialSeconds,
  nextCheckIn,
  nextCheckInTime,
  showCheckInButton,
  formatTime,
  handleCheckIn,
}) => {
  const screenHeight = Dimensions.get('window').height -200;
  const translateY = useSharedValue(0);

  useEffect(() => {
    const progress = secondsRemaining / initialSeconds;
    // Start full (0), end at full screen drain (screenHeight)
    translateY.value = withTiming((1 - progress) * screenHeight, { duration: 1000 });
}, [secondsRemaining, initialSeconds]);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));


  return (
    <View style={styles.container}>
      {/* Animated waves */}
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
          verticalOffset={screenHeight * 0.049}  // Closer for more overlap
          opacity={0.7} 
          speed={5000} 
          fullHeight={screenHeight} 
        />
        <Wave 
          color={Colors.base} 
          amplitude={35} 
          verticalOffset={screenHeight * 0.05}  // Closer for more overlap
          opacity={0.5} 
          speed={6000} 
          fullHeight={screenHeight} 
        />
      </Animated.View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Text style={[styles.countdownText, Typography.heading]}>
            {formatTime(secondsRemaining)}
          </Text>
          {nextCheckIn !== null && nextCheckInTime !== null && (
            <View style={styles.nextCheckInContainer}>
              <Text style={[styles.nextCheckInText, Typography.body]}>
                Next Check-in: {nextCheckInTime}
              </Text>
            </View>
          )}
          {showCheckInButton && (
            <TouchableOpacity
              style={[GlobalStyles.fullWidthButton, styles.checkInButton, Shadows.subtle]}
              onPress={handleCheckIn}
              activeOpacity={0.7}
            >
              <Text style={[Typography.subheading, GlobalStyles.buttonText]}>Check In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TimerCountdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,  
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: -10,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  contentWrapper: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  countdownText: {
    color: Colors.darker,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    width: '100%'
  },
  nextCheckInContainer: {
    width: '100%',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  nextCheckInText: {
    color: Colors.dark,
    textAlign: 'center',
  },
  checkInButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});