import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';

// Props interface describing what data/functions this component needs
interface TimerCountdownProps {
  secondsRemaining: number;                  // Number of seconds left on the countdown
  nextCheckIn: number | null;                 // The index/order of the next check-in (null if none)
  nextCheckInTime: string | null;             // Human-readable time for the next check-in
  showCheckInButton: boolean;                 // Whether to display the check-in button
  formatTime: (seconds: number) => string;    // Function to format seconds into a time string
  handleCheckIn: () => void;                  // Function called when the user taps "Check In"
}

// Functional component definition
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
      
      {/* Main countdown display, formatted from secondsRemaining */}
      <Text style={styles.countdownText}>
        {formatTime(secondsRemaining)}
      </Text>

      {/* If there is a next check-in scheduled, show its time */}
      {nextCheckIn !== null && nextCheckInTime !== null && (
        <Text style={styles.nextCheckInText}>
          Next Check-in: {nextCheckInTime}
        </Text>
      )}

      {/* If the check-in button should be visible, render it */}
      {showCheckInButton && (
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={handleCheckIn} // Trigger check-in action
        >
          <Text style={styles.checkInButtonText}>Check In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimerCountdown;

// Component-specific styles using shared design tokens
const styles = StyleSheet.create({
  countdownContainer: {
    alignItems: 'center',          // Center horizontally
    justifyContent: 'center',      // Center vertically
    marginTop: Spacing.lg,        
  },
  countdownText: {
    ...Typography.title,           // Base title style from global typography
    fontSize: 48,                   // Large countdown font
    color: Colors.black,            
    fontFamily: 'JosefinSans_400Regular',
    marginBottom: Spacing.lg,       
  },
  nextCheckInText: {
    ...Typography.body,             
    fontSize: 18,                    // Slightly smaller than countdown
    color: Colors.midDark,           
    marginBottom: Spacing.md,        
  },
  checkInButton: {
    backgroundColor: Colors.primary, 
    width: 120,                       // Circular button width
    height: 120,                      // Circular button height
    borderRadius: 60,                 // Half of width/height for perfect circle
    justifyContent: 'center',         
    alignItems: 'center',             
    marginBottom: Spacing.lg,         
  },
  checkInButtonText: {
    color: Colors.white,             
    fontSize: 24,                      
    fontFamily: 'JosefinSans_400Regular',
  },

});
