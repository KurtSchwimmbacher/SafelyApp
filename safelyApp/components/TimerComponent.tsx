// Main component that orchestrates the timer

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../styles/GlobalStyles';
import TimerSetup from './TimerSetup';
import TimerCountdown from './TimerCountdown';
import { useTimer } from '../hooks/useTimer';
import { SafeAreaView } from 'react-native-safe-area-context';

const TimerComponent: React.FC = () => {
  const {
    minutes,
    timerName,
    checkIns,
    isRunning,
    secondsRemaining,
    nextCheckIn,
    showCheckInButton,
    setMinutes,
    setTimerName,
    setCheckIns,
    handleSaveTimer,
    handleCheckIn,
    stopTimer
  } = useTimer();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format next check-in time
  const formatNextCheckIn = (interval: number) => {
    const { startTime, minutes } = useTimer();
    if (!startTime) return '00:00';
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const elapsedMs = now - start;
    const remainingMs = interval - elapsedMs;
    const remainingSeconds = Math.floor(remainingMs / 1000);
    return formatTime(Math.max(0, remainingSeconds));
  };

  return (
    <View style={styles.container}>
      {isRunning ? (
        <TimerCountdown
          secondsRemaining={secondsRemaining}
          nextCheckIn={nextCheckIn}
          showCheckInButton={showCheckInButton}
          formatTime={formatTime}
          formatNextCheckIn={formatNextCheckIn}
          handleCheckIn={handleCheckIn}
          stopTimer={stopTimer}
        />
      ) : (
        <TimerSetup
          minutes={minutes}
          timerName={timerName}
          checkIns={checkIns}
          setMinutes={setMinutes}
          setTimerName={setTimerName}
          setCheckIns={setCheckIns}
          handleSaveTimer={handleSaveTimer}
        />
      )}
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
});