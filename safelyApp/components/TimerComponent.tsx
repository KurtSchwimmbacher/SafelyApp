import React from 'react';
import TimerSetup from './timerSetup/TimerSetup';
import TimerCountdown from './TimerCountdown';
import { useTimer } from '../hooks/useTimer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/componentStyles/TimerComponent.styles';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TimerComponent: React.FC = () => {
  const {
    minutes,
    setMinutes,
    timerName,
    setTimerName,
    checkIns,
    setCheckIns,
    checkInContact,
    setCheckInContact,
    isRunning,
    secondsRemaining,
    nextCheckIn,
    nextCheckInTime,
    showCheckInButton,
    handleCheckIn,
    handleSaveTimer,
    timerId,
    refreshTimer,
    stopTimer,
  } = useTimer();

  return (
    <SafeAreaView style={styles.container}>
      {isRunning ? (
        <TimerCountdown
          secondsRemaining={secondsRemaining}
          initialSeconds={minutes * 60}
          nextCheckIn={nextCheckIn}
          nextCheckInTime={nextCheckInTime}
          showCheckInButton={showCheckInButton}
          formatTime={formatTime}
          handleCheckIn={handleCheckIn}
          timerName={timerName}
          currentMinutes={minutes}
          checkIns={checkIns}
          checkInContact={checkInContact}
          timerId={timerId!}
          onTimerUpdated={refreshTimer}
          onTimerDeleted={stopTimer}
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
    </SafeAreaView>
  );
};

export default TimerComponent;

