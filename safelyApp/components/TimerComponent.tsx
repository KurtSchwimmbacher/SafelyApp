import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../styles/GlobalStyles';
import TimerSetup from './timerSetup/TimerSetup';
import TimerCountdown from './TimerCountdown';
import { useTimer } from '../hooks/useTimer';

const TimerComponent: React.FC = () => {
  const {
    minutes,
    timerName,
    checkIns,
    checkInContact,
    isRunning,
    secondsRemaining,
    nextCheckIn,
    nextCheckInTime,
    showCheckInButton,
    setMinutes,
    setTimerName,
    setCheckIns,
    setCheckInContact,
    handleSaveTimer,
    handleCheckIn,
  } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {isRunning ? (
        <TimerCountdown
          secondsRemaining={secondsRemaining}
          nextCheckIn={nextCheckIn}
          nextCheckInTime={nextCheckInTime}
          showCheckInButton={showCheckInButton}
          formatTime={formatTime}
          handleCheckIn={handleCheckIn}
        />
      ) : (
        <TimerSetup
          minutes={minutes}
          timerName={timerName}
          checkIns={checkIns}
          checkInContact={checkInContact}
          setMinutes={setMinutes}
          setTimerName={setTimerName}
          setCheckIns={setCheckIns}
          setCheckInContact={setCheckInContact}
          handleSaveTimer={handleSaveTimer}
        />
      )}
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
