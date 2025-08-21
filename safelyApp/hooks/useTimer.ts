import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getActiveTimer, saveTimer, markTimerInactive, logCheckInStatus, Timer } from '../services/timersService';
import { sendSMS } from '../services/messageService';

/**
 * Interface defining the shape of our timer state and actions.
 */
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
  stopTimer: (isDeleted?: boolean) => void;
  refreshTimer: () => Promise<void>;
}

/**
 * Sends a missed check-in alert to the given contact via SMS.
 */
const sendMissedCheckInNotification = async (contact: string, timerName: string) => {
  try {
    const message = `Alert: ${timerName ? `"${timerName}"` : 'Your timer'} missed a check-in!`;
    await sendSMS(contact, message);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

/**
 * Utility to format seconds as "MM:SS".
 */
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Custom hook managing a countdown timer with optional check-ins and contact alerts.
 */
export const useTimer = (): TimerState => {
  // Core timer state
  const [minutes, setMinutes] = useState(17);
  const [timerName, setTimerName] = useState('');
  const [checkIns, setCheckIns] = useState('');
  const [checkInContact, setCheckInContact] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  // Check-in related state
  const [checkInIntervals, setCheckInIntervals] = useState<number[]>([]);
  const [nextCheckIn, setNextCheckIn] = useState<number | null>(null);
  const [nextCheckInTime, setNextCheckInTime] = useState<string | null>(null);
  const [showCheckInButton, setShowCheckInButton] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<number | null>(null);

  // Persistent timer tracking
  const [timerId, setTimerId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);

  /**
   * Loads or refreshes the active timer from storage.
   */
  const refreshTimer = async () => {
    try {
      const activeTimer = await getActiveTimer();
      if (activeTimer) {
        setTimerId(activeTimer.id);
        setCheckInIntervals(activeTimer.checkInIntervals || []);
        setMinutes(activeTimer.minutes);
        setTimerName(activeTimer.timerName || '');
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
          await markTimerInactive(activeTimer.id).catch((error) => {
            if (error.code === 'not-found') {
              console.log('Timer document not found during refresh, likely already deleted');
            } else {
              console.error('Failed to mark timer as inactive during refresh:', error);
            }
          });
          setTimerId(null);
          setStartTime(null);
          setCheckInIntervals([]);
          setCheckInContact('');
          setTimerName('');
          setSecondsRemaining(0);
          setIsRunning(false);
        }
      } else {
        // No active timer, reset state
        setTimerId(null);
        setStartTime(null);
        setCheckInIntervals([]);
        setCheckInContact('');
        setTimerName('');
        setSecondsRemaining(0);
        setIsRunning(false);
      }
    } catch (error) {
      console.error('Error refreshing timer:', error);
    }
  };

  /**
   * On mount → load any active timer from storage.
   */
  useEffect(() => {
    refreshTimer();
  }, []);

  /**
   * Main countdown interval.
   * Runs every second when timer is active to update:
   * - Remaining time
   * - Next check-in countdown
   * - Missed check-in detection and alerts
   */
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

        // Timer finished
        if (newSecondsRemaining <= 0) {
          setIsRunning(false);
          setShowCheckInButton(false);
          setNextCheckIn(null);
          setNextCheckInTime(null);
          if (timerId) {
            await markTimerInactive(timerId).catch((error) => {
              if (error.code === 'not-found') {
                console.log('Timer document not found during countdown, likely already deleted');
              } else {
                console.error('Failed to mark timer as inactive:', error);
              }
            });
          }
          setTimerId(null);
          setStartTime(null);
          setCheckInContact('');
          setTimerName('');
          return;
        }

        // Show check-in button if we're at a scheduled check-in interval
        const upcomingCheckIn = checkInIntervals.find(
          (interval) => interval > elapsedMs && interval <= elapsedMs + 5000
        );
        if (upcomingCheckIn && !showCheckInButton) {
          setShowCheckInButton(true);
          setLastCheckInTime(Date.now());
        }

        // Update next check-in countdown display
        const next = checkInIntervals.find((interval) => interval > elapsedMs);
        setNextCheckIn(next || null);
        if (next) {
          const remainingMs = next - elapsedMs;
          const remainingSeconds = Math.floor(remainingMs / 1000);
          setNextCheckInTime(formatTime(Math.max(0, remainingSeconds)));
        } else {
          setNextCheckInTime(null);
        }

        // Missed check-in detection (30s timeout)
        if (showCheckInButton && lastCheckInTime && Date.now() - lastCheckInTime > 30000 && timerId) {
          const checkInTime = new Date().toISOString();
          await logCheckInStatus(timerId, 'missed', checkInTime).catch((error) => {
            if (error.code === 'not-found') {
              console.log('Timer document not found during check-in, likely already deleted');
            } else {
              console.error('Failed to log missed check-in:', error);
            }
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
  }, [
    isRunning,
    secondsRemaining,
    checkInIntervals,
    showCheckInButton,
    lastCheckInTime,
    timerId,
    startTime,
    minutes,
    checkInContact,
    timerName
  ]);

  /**
   * Creates and starts a new timer.
   * Saves to storage, validates inputs, sets state.
   */
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

      // Save to backend/service
      const timerId = await saveTimer(minutes, timerName, checkInsNum, checkInContact);
      Alert.alert('Success', `Timer${timerName ? ` "${timerName}"` : ''} saved to your profile!`);

      // Reset some form fields and start timer
      setTimerName('');
      setCheckIns('');
      setTimerId(timerId);
      setStartTime(new Date().toISOString());
      setSecondsRemaining(minutes * 60);
      setIsRunning(true);

      // Reload intervals and contact from saved timer
      await refreshTimer();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save timer. Please try again.');
    }
  };

  /**
   * Stops the timer and resets state.
   * Marks timer inactive in storage unless it was just deleted.
   * @param isDeleted - Indicates if the timer was deleted (skip marking inactive).
   */
  const stopTimer = (isDeleted: boolean = false) => {
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
    if (timerId && !isDeleted) {
      markTimerInactive(timerId).catch((error) => {
        if (error.code === 'not-found') {
          console.log('Timer document not found, likely already deleted');
        } else {
          console.error('Failed to mark timer as inactive:', error);
        }
      });
    }
    setTimerId(null);
    setStartTime(null);
  };

  /**
   * Marks a check-in as completed.
   */
  const handleCheckIn = () => {
    if (timerId) {
      const checkInTime = new Date().toISOString();
      logCheckInStatus(timerId, 'completed', checkInTime).catch((error) => {
        if (error.code === 'not-found') {
          console.log('Timer document not found during check-in, likely already deleted');
        } else {
          console.error('Failed to log check-in:', error);
        }
      });
    }
    setShowCheckInButton(false);
    setLastCheckInTime(null);
  };

  // Return state + control functions for components to use
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
    stopTimer,
    refreshTimer,
  };
};