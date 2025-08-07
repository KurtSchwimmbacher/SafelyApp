import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

// Define the Timer interface for TypeScript
export interface Timer {
  id: string;
  uid: string;
  minutes: number;
  createdAt: string;
  startTime: string; // ISO string for when the timer started
  timerName: string;
  checkIns: number;
  checkInIntervals: number[];
  checkInStatuses: { time: string; status: 'completed' | 'missed' }[];
  isActive: boolean;
}

export const saveTimer = async (minutes: number, tName: string, checkIns: number): Promise<string> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    // Check if user already has an active timer
    const activeTimer = await getActiveTimer();
    if (activeTimer) {
      throw new Error('You already have an active timer. Please wait until it finishes.');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');
    const startTime = new Date().toISOString();

    // Calculate check-in intervals if checkIns is greater than 0
    const checkInIntervals = checkIns > 0
      ? Array.from(
          { length: checkIns },
          (_, i) => Math.round((minutes / checkIns) * (i + 1) * 60 * 1000) // Convert to milliseconds
        )
      : [];

    const docRef = await addDoc(timersRef, {
      uid: user.uid,
      minutes,
      createdAt: startTime,
      startTime,
      timerName: tName,
      checkIns,
      checkInIntervals,
      checkInStatuses: [],
      isActive: true
    });

    console.log('Timer saved successfully');
    return docRef.id;
  } catch (error) {
    console.error('Error saving timer:', error);
    throw error;
  }
};

export const getActiveTimer = async (): Promise<Timer | null> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');
    const q = query(
      timersRef,
      where('uid', '==', user.uid),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }

    const timerDoc = querySnapshot.docs[0];
    return {
      id: timerDoc.id,
      ...timerDoc.data()
    } as Timer;
  } catch (error) {
    console.error('Error fetching active timer:', error);
    throw error;
  }
};

export const markTimerInactive = async (timerId: string): Promise<void> => {
  try {
    const db = getFirestore();
    const timerRef = doc(db, 'timers', timerId);
    await updateDoc(timerRef, {
      isActive: false
    });
    console.log('Timer marked as inactive');
  } catch (error) {
    console.error('Error marking timer as inactive:', error);
    throw error;
  }
};

export const logCheckInStatus = async (timerId: string, status: 'completed' | 'missed', time: string): Promise<void> => {
  try {
    const db = getFirestore();
    const timerRef = doc(db, 'timers', timerId);
    const timer = await getActiveTimer();
    if (!timer || timer.id !== timerId) {
      throw new Error('No active timer found or timer ID mismatch');
    }
    const updatedStatuses = [...(timer.checkInStatuses || []), { time, status }];
    await updateDoc(timerRef, {
      checkInStatuses: updatedStatuses
    });
    console.log(`Check-in status ${status} logged at ${time}`);
  } catch (error) {
    console.error('Error logging check-in status:', error);
    throw error;
  }
};