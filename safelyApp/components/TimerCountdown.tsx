import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from '../styles/GlobalStyles';

interface TimerCountdownProps {
  secondsRemaining: number;
  nextCheckIn: number | null;
  nextCheckInTime: string | null;
  showCheckInButton: boolean;
  formatTime: (seconds: number) => string;
  handleCheckIn: () => void;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  secondsRemaining,
  nextCheckIn,
  nextCheckInTime,
  showCheckInButton,
  formatTime,
  handleCheckIn,
}) => {
  return (
    <View style={styles.container}>
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
  );
};

export default TimerCountdown;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.lg, 
  },
  countdownText: {
    color: Colors.darker,
    marginBottom: Spacing.sm,
    textAlign: 'center',
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
