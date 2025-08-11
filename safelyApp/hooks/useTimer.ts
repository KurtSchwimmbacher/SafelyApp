import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getActiveTimer, saveTimer, markTimerInactive, logCheckInStatus, Timer } from '../services/timersService';

export interface TimerState {
  minutes: number;
  timerName: string;
  checkIns: string;
  checkInContact: string;
  isRunning: boolean;
  secondsRemaining: number;
  checkInIntervals: number[];
  nextCheckIn: number | null;
  nextCheckInTime: string | null;
  showCheckInButton: boolean;
  timerId: string | null;
  startTime: string | null;
  setMinutes: (minutes: number) => void;
  setTimerName: (name: string) => void;
  setCheckIns: (checkIns: string) => void;
  setCheckInContact: (contact: string) => void;
  handleSaveTimer: () => Promise<void>;
  handleCheckIn: () => void;
  stopTimer: () => void;
}

const sendMissedCheckInNotification = async (contact: string, timerName: string) => {
  try {
    console.log(`Sending notification to ${contact} for missed check-in on timer "${timerName}"`);
    // Replace with actual notification logic (e.g., Firebase Cloud Messaging, email, SMS)
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const useTimer = (): TimerState => {
  const [minutes, setMinutes] = useState(17);
  const [timerName, setTimerName] = useState('');
  const [checkIns, setCheckIns] = useState('');
  const [checkInContact, setCheckInContact] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [checkInIntervals, setCheckInIntervals] = useState<number[]>([]);
  const [nextCheckIn, setNextCheckIn] = useState<number | null>(null);
  const [nextCheckInTime, setNextCheckInTime] = useState<string | null>(null);
  const [showCheckInButton, setShowCheckInButton] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);

  useEffect(() => {
    const loadActiveTimer = async () => {
      try {
        const activeTimer = await getActiveTimer();
        if (activeTimer) {
          setTimerId(activeTimer.id);
          setCheckInIntervals(activeTimer.checkInIntervals || []);
          setMinutes(activeTimer.minutes);
          setTimerName(activeTimer.timerName || ''); // Preserve timerName
          setCheckInContact(activeTimer.checkInContact || '');

          setStartTime(activeTimer.startTime);

          const start = new Date(activeTimer.startTime).getTime();
          const now = Date.now();
          const elapsedMs = now - start;
          const totalSeconds = activeTimer.minutes * 60;
          const secondsLeft = Math.max(0, totalSeconds - Math.floor(elapsedMs / 1000));

          

          if (secondsLeft > 0) {
            setSecondsRemaining(secondsLeft);
            setIsRunning(true);
          } else {
            await markTimerInactive(activeTimer.id);
            setTimerId(null);
            setStartTime(null);
            setCheckInIntervals([]);
            setCheckInContact('');
            setTimerName('');
            
          }
        }
      } catch (error) {
        console.error('Error loading active timer:', error);
      }
    };
    loadActiveTimer();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0 && startTime) {
      interval = setInterval(async () => {
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
          setNextCheckInTime(null);
          if (timerId) {
            await markTimerInactive(timerId).catch((error) => {
              console.error('Failed to mark timer as inactive:', error);
            });
          }
          setTimerId(null);
          setStartTime(null);
          setCheckInContact('');
          setTimerName('');
          return;
        }

        const elapsedTime = elapsedMs;
        const upcomingCheckIn = checkInIntervals.find(
          (interval) => interval > elapsedTime && interval <= elapsedTime + 5000
        );

        if (upcomingCheckIn && !showCheckInButton) {
          setShowCheckInButton(true);
          setLastCheckInTime(Date.now());
          
        }

        const next = checkInIntervals.find((interval) => interval > elapsedTime);
        setNextCheckIn(next || null);

        if (next) {
          const remainingMs = next - elapsedMs;
          const remainingSeconds = Math.floor(remainingMs / 1000);
          setNextCheckInTime(formatTime(Math.max(0, remainingSeconds)));
        } else {
          setNextCheckInTime(null);
        }

        if (showCheckInButton && lastCheckInTime && Date.now() - lastCheckInTime > 30000 && timerId) {
          const checkInTime = new Date().toISOString();
          
          await logCheckInStatus(timerId, 'missed', checkInTime).catch((error) => {
            console.error('Failed to log missed check-in:', error);
          });
          if (checkInContact) {
            await sendMissedCheckInNotification(checkInContact, timerName);
          } else {
            console.log('No checkInContact provided, skipping notification');
          }
          setShowCheckInButton(false);
          setLastCheckInTime(null);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, checkInIntervals, showCheckInButton, lastCheckInTime, timerId, startTime, minutes, checkInContact, timerName]);

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
      const timerId = await saveTimer(minutes, timerName, checkInsNum, checkInContact);
      Alert.alert('Success', `Timer${timerName ? ` "${timerName}"` : ''} saved to your profile!`);
      // Do not reset checkInContact 
      setTimerName('');
      setCheckIns('');
      setTimerId(timerId);
      setStartTime(new Date().toISOString());
      setSecondsRemaining(minutes * 60);
      setIsRunning(true);
      const activeTimer = await getActiveTimer();
      if (activeTimer) {
        setCheckInIntervals(activeTimer.checkInIntervals || []);
        setCheckInContact(activeTimer.checkInContact || ''); 
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
    setNextCheckInTime(null);
    setShowCheckInButton(false);
    setLastCheckInTime(null);
    setCheckInContact('');
    setTimerName('');
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
    setShowCheckInButton(false);
    setLastCheckInTime(null);
  };

  return {
    minutes,
    timerName,
    checkIns,
    checkInContact,
    isRunning,
    secondsRemaining,
    checkInIntervals,
    nextCheckIn,
    nextCheckInTime,
    showCheckInButton,
    timerId,
    startTime,
    setMinutes,
    setTimerName,
    setCheckIns,
    setCheckInContact,
    handleSaveTimer,
    handleCheckIn,
    stopTimer
  };
};