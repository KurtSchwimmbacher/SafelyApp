import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';

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
    const timerData = timerDoc.data();

    return {
      id: timerDoc.id,
      ...timerData
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
    const timerSnap = await getDoc(timerRef);

    if (!timerSnap.exists()) {
      console.log('Timer document not found, no update needed');
      return;
    }

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

export const updateTimer = async (
  timerId: string,
  updates: Partial<Omit<Timer, 'id' | 'uid' | 'createdAt'>>
): Promise<void> => {
  try {
    const db = getFirestore();
    const timerRef = doc(db, 'timers', timerId);

    // Recalculate checkInIntervals if minutes or checkIns are updated
    if (updates.minutes !== undefined || updates.checkIns !== undefined) {
      const timerSnap = await getDoc(timerRef);
      if (!timerSnap.exists()) {
        throw new Error('Timer not found');
      }
      const current = timerSnap.data() as Omit<Timer, 'id'>;
      const newMinutes = updates.minutes ?? current.minutes;
      const newCheckIns = updates.checkIns ?? current.checkIns;
      const newIntervals = newCheckIns > 0
        ? Array.from(
            { length: newCheckIns },
            (_, i) => Math.round((newMinutes / 2 / newCheckIns) * (i + 1) * 60 * 1000)
          )
        : [];
      updates = { ...updates, checkInIntervals: newIntervals };
    }

    await updateDoc(timerRef, updates);
  } catch (error) {
    console.error('Error updating timer:', error);
    throw error;
  }
};

export const deleteTimer = async (timerId: string): Promise<void> => {
  try {
    const db = getFirestore();
    const timerRef = doc(db, 'timers', timerId);
    await deleteDoc(timerRef);
  } catch (error) {
    console.error('Error deleting timer:', error);
    throw error;
  }
};