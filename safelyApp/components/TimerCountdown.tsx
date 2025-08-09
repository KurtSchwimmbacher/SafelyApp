// UI for countdown screen (timer display, check-in button)

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, GlobalStyles, Spacing, Typography } from '../styles/GlobalStyles';

interface TimerCountdownProps {
  secondsRemaining: number;
  nextCheckIn: number | null;
  showCheckInButton: boolean;
  formatTime: (seconds: number) => string;
  formatNextCheckIn: (interval: number) => string;
  handleCheckIn: () => void;
  stopTimer: () => void;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  secondsRemaining,
  nextCheckIn,
  showCheckInButton,
  formatTime,
  formatNextCheckIn,
  handleCheckIn,
  stopTimer
}) => {
  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>{formatTime(secondsRemaining)}</Text>
      {nextCheckIn !== null && (
        <Text style={styles.nextCheckInText}>
          Next Check-in: {formatNextCheckIn(nextCheckIn)}
        </Text>
      )}
      
      <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopTimer}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>


      {showCheckInButton && (
        <TouchableOpacity style={GlobalStyles.fullWidthButton} onPress={handleCheckIn}>
          <Text style={GlobalStyles.buttonText}>Check In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimerCountdown;

const styles = StyleSheet.create({
  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  countdownText: {
    ...Typography.title,
    fontSize: 48,
    color: Colors.black,
    fontFamily: 'JosefinSans_400Regular',
    marginBottom: Spacing.lg,
  },
  nextCheckInText: {
    ...Typography.body,
    fontSize: 18,
    color: Colors.midDark,
    marginBottom: Spacing.md,
  },

  button: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  stopButton: {
    width: 100,
    backgroundColor: Colors.darker,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
});