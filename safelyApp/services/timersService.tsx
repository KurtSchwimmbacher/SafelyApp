import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export interface Timer {
  id: string;
  uid: string;
  minutes: number;
  createdAt: string;
  startTime: string;
  timerName: string;
  checkIns: number;
  checkInIntervals: number[];
  checkInStatuses: { time: string; status: 'completed' | 'missed' }[];
  isActive: boolean;
  checkInContact: string;
}

export const saveTimer = async (minutes: number, tName: string, checkIns: number, checkInContact: string): Promise<string> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    const activeTimer = await getActiveTimer();
    if (activeTimer) {
      throw new Error('You already have an active timer. Please wait until it finishes.');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');
    const startTime = new Date().toISOString();

    const checkInIntervals = checkIns > 0
      ? Array.from(
          { length: checkIns },
          (_, i) => Math.round((minutes / 2 / checkIns) * (i + 1) * 60 * 1000)
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
      isActive: true,
      checkInContact
    });

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
  } catch (error) {
    console.error('Error logging check-in status:', error);
    throw error;
  }
};