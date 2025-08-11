import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, GlobalStyles, Spacing, Typography } from '../styles/GlobalStyles';

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
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>
        {formatTime(secondsRemaining)}
      </Text>

      {nextCheckIn !== null && nextCheckInTime !== null && (
        <Text style={styles.nextCheckInText}>
          Next Check-in: {nextCheckInTime}
        </Text>
      )}

      {showCheckInButton && (
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={handleCheckIn}
        >
          <Text style={styles.checkInButtonText}>Check In</Text>
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
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
});