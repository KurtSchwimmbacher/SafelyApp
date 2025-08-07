import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';
import { saveTimer, getActiveTimer, markTimerInactive, logCheckInStatus, Timer } from '../services/timersService';

const TimerComponent: React.FC = () => {
  const [minutes, setMinutes] = useState(17);
  const [timerName, setTimerName] = useState('');
  const [checkIns, setCheckIns] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [checkInIntervals, setCheckInIntervals] = useState<number[]>([]);
  const [nextCheckIn, setNextCheckIn] = useState<number | null>(null);
  const [showCheckInButton, setShowCheckInButton] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);

  // Load active timer on component mount
  useEffect(() => {
    const loadActiveTimer = async () => {
      try {
        const activeTimer = await getActiveTimer();
        if (activeTimer) {
          setTimerId(activeTimer.id);
          setCheckInIntervals(activeTimer.checkInIntervals || []);
          setMinutes(activeTimer.minutes);
          setStartTime(activeTimer.startTime);

          // Calculate elapsed time and remaining seconds
          const start = new Date(activeTimer.startTime).getTime();
          const now = Date.now();
          const elapsedMs = now - start;
          const totalSeconds = activeTimer.minutes * 60;
          const secondsLeft = Math.max(0, totalSeconds - Math.floor(elapsedMs / 1000));
          
          if (secondsLeft > 0) {
            setSecondsRemaining(secondsLeft);
            setIsRunning(true);
          } else {
            // Timer has expired
            await markTimerInactive(activeTimer.id);
            setTimerId(null);
            setStartTime(null);
            setCheckInIntervals([]);
          }
        }
      } catch (error) {
        console.error('Error loading active timer:', error);
      }
    };
    loadActiveTimer();
  }, []);

  // Handle countdown logic and check-in detection
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0 && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const start = new Date(startTime).getTime();
        const elapsedMs = now - start;
        const totalSeconds = minutes * 60;
        const newSecondsRemaining = Math.max(0, totalSeconds - Math.floor(elapsedMs / 1000));

        setSecondsRemaining(newSecondsRemaining);

        if (newSecondsRemaining <= 0) {
          setIsRunning(false);
          setShowCheckInButton(false);
          setNextCheckIn(null);
          if (timerId) {
            markTimerInactive(timerId).catch((error) => {
              console.error('Failed to mark timer as inactive:', error);
            });
          }
          setTimerId(null);
          setStartTime(null);
          return;
        }

        // Calculate elapsed time in milliseconds for check-ins
        const elapsedTime = elapsedMs;

        // Find the next check-in
        const upcomingCheckIn = checkInIntervals.find(
          (interval) => interval > elapsedTime && interval <= elapsedTime + 5000 // Within 5 seconds
        );

        if (upcomingCheckIn && !showCheckInButton) {
          setShowCheckInButton(true);
          setLastCheckInTime(Date.now());
        }

        // Update next check-in time
        const next = checkInIntervals.find((interval) => interval > elapsedTime);
        setNextCheckIn(next || null);

        // Check for missed check-in (2 minutes = 120,000 ms)
        if (showCheckInButton && lastCheckInTime && Date.now() - lastCheckInTime > 120000 && timerId) {
          const checkInTime = new Date().toISOString();
          logCheckInStatus(timerId, 'missed', checkInTime).catch((error) => {
            console.error('Failed to log missed check-in:', error);
          });
          setShowCheckInButton(false);
          setLastCheckInTime(null);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, checkInIntervals, showCheckInButton, lastCheckInTime, timerId, startTime, minutes]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format next check-in time
  const formatNextCheckIn = (interval: number) => {
    if (!startTime) return '00:00';
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const elapsedMs = now - start;
    const remainingMs = interval - elapsedMs;
    const remainingSeconds = Math.floor(remainingMs / 1000);
    return formatTime(Math.max(0, remainingSeconds));
  };

  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  const handleSaveTimer = async () => {
    try {
      const checkInsNum = parseInt(checkIns) || 0;
      if (checkInsNum < 0) {
        Alert.alert('Error', 'Number of check-ins cannot be negative.');
        return;
      }
      if (minutes === 0) {
        Alert.alert('Error', 'Timer duration must be greater than 0 minutes.');
        return;
      }
      const timerId = await saveTimer(minutes, timerName, checkInsNum);
      Alert.alert('Success', `Timer${timerName ? ` "${timerName}"` : ''} saved to your profile!`);
      setTimerName('');
      setCheckIns('');
      setTimerId(timerId);
      setStartTime(new Date().toISOString());
      setSecondsRemaining(minutes * 60);
      setIsRunning(true);
      const activeTimer = await getActiveTimer();
      if (activeTimer) {
        setCheckInIntervals(activeTimer.checkInIntervals || []);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save timer. Please try again.');
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(0);
    setMinutes(17);
    setCheckInIntervals([]);
    setNextCheckIn(null);
    setShowCheckInButton(false);
    setLastCheckInTime(null);
    if (timerId) {
      markTimerInactive(timerId).catch((error) => {
        console.error('Failed to mark timer as inactive:', error);
      });
    }
    setTimerId(null);
    setStartTime(null);
  };

  const handleCheckIn = () => {
    if (timerId) {
      const checkInTime = new Date().toISOString();
      logCheckInStatus(timerId, 'completed', checkInTime).catch((error) => {
        console.error('Failed to log check-in:', error);
      });
    }
    console.log('Check-in recorded at:', new Date().toISOString());
    setShowCheckInButton(false);
    setLastCheckInTime(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        value={timerName}
        onChangeText={setTimerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Check-ins"
        value={checkIns}
        onChangeText={setCheckIns}
        keyboardType="numeric"
      />
      <View style={styles.timerContainer}>
        {isRunning ? (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{formatTime(secondsRemaining)}</Text>
            {nextCheckIn !== null && (
              <Text style={styles.nextCheckInText}>
                Next Check-in: {formatNextCheckIn(nextCheckIn)}
              </Text>
            )}
            {showCheckInButton && (
              <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
                <Text style={styles.checkInButtonText}>Check In</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopTimer}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Svg height="250" width="250" viewBox="0 0 200 200">
              <Circle
                cx="100"
                cy="100"
                r="90"
                stroke={Colors.darker}
                strokeWidth="20"
                fill="none"
              />
              <Circle
                cx="100"
                cy="100"
                r="90"
                stroke={Colors.primary}
                strokeWidth="20"
                fill="none"
                strokeDasharray={[2 * Math.PI * 90 * (minutes / 60), 2 * Math.PI * 90]}
                strokeDashoffset={(-0.25 * 2 * Math.PI * 270)}
              />
              <Text style={styles.timerText}>
                {minutes}
                {'\n'}
                <Text style={styles.timerUnit}>Minutes</Text>
              </Text>
            </Svg>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => updateMinutes(-1)}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => updateMinutes(1)}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveTimer}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'relative',
    alignItems: 'center',
  },
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
  timerText: {
    ...Typography.title,
    fontSize: 48,
    top: '130%',
    textAlign: 'center',
    color: Colors.black,
  },
  timerUnit: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginTop: Spacing.md,
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
  saveButton: {
    width: 100,
    marginTop: Spacing.lg,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.midDark,
    borderRadius: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    marginTop: Spacing.md,
    width: '80%',
    fontSize: Spacing.md,
    color: Colors.midDark,
    fontFamily: 'JosefinSans_400Regular',
  },
});