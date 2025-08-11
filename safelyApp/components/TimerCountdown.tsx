import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';

interface TimerCountdownProps {
  secondsRemaining: number;
  nextCheckIn: number | null;
  showCheckInButton: boolean;
  formatTime: (seconds: number) => string;
  formatNextCheckIn: (interval: number) => string;
  handleCheckIn: () => void;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  secondsRemaining,
  nextCheckIn,
  showCheckInButton,
  formatTime,
  formatNextCheckIn,
  handleCheckIn,
}) => {
  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>
        {formatTime(secondsRemaining)}
      </Text>

      {nextCheckIn !== null && (
        <Text style={styles.nextCheckInText}>
          Next Check-in: {formatNextCheckIn(nextCheckIn)}
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
  checkInButton: {
    backgroundColor: Colors.primary,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  checkInButtonText: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: 'JosefinSans_400Regular',
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