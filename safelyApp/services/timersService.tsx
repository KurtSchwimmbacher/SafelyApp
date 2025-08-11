import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

/**
 * Timer object shape as stored in Firestore.
 */
export interface Timer {
  id: string; // Firestore document ID
  uid: string; // ID of the user who created the timer
  minutes: number; // Total duration in minutes
  createdAt: string; // ISO string when timer was created
  startTime: string; // ISO string when timer actually started
  timerName: string; // Optional user-defined name for the timer
  checkIns: number; // Total number of check-ins planned
  checkInIntervals: number[]; // Times in ms from start when check-ins should happen
  checkInStatuses: { time: string; status: 'completed' | 'missed' }[]; // Log of completed/missed check-ins
  isActive: boolean; // Whether timer is still running
  checkInContact: string; // Contact number for missed check-in alerts
}

/**
 * Creates a new active timer document in Firestore.
 * - Validates that a user is logged in.
 * - Ensures no other active timer exists for that user.
 * - Calculates check-in intervals.
 * - Saves timer data to Firestore.
 * 
 * @param minutes - Total timer length in minutes.
 * @param tName - Optional name for the timer.
 * @param checkIns - Number of check-ins planned during the timer.
 * @param checkInContact - Contact number to alert if a check-in is missed.
 * @returns The Firestore document ID of the created timer.
 */
export const saveTimer = async (minutes: number, tName: string, checkIns: number, checkInContact: string): Promise<string> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    // Prevent multiple active timers for one user
    const activeTimer = await getActiveTimer();
    if (activeTimer) {
      throw new Error('You already have an active timer. Please wait until it finishes.');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');
    const startTime = new Date().toISOString();

    // Calculate check-in intervals (ms from start)
    // Formula: evenly spaced intervals within half of the total time
    const checkInIntervals = checkIns > 0
      ? Array.from(
          { length: checkIns },
          (_, i) => Math.round((minutes / 2 / checkIns) * (i + 1) * 60 * 1000)
        )
      : [];

    console.log('Saving timer with data:', { minutes, timerName: tName, checkIns, checkInContact, checkInIntervals });

    // Save the timer document
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

/**
 * Fetches the current active timer for the authenticated user.
 * - Queries Firestore for timers with `isActive == true`.
 * - Returns the first active timer found, or `null` if none.
 * 
 * @returns A Timer object or null if no active timer exists.
 */
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
    console.log('Raw Firestore timer data:', timerData);

    return {
      id: timerDoc.id,
      ...timerData
    } as Timer;
  } catch (error) {
    console.error('Error fetching active timer:', error);
    throw error;
  }
};

/**
 * Marks a timer as inactive in Firestore.
 * Used when the timer expires or is manually stopped.
 * 
 * @param timerId - Firestore document ID of the timer.
 */
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

/**
 * Logs a completed or missed check-in for a given timer.
 * - Fetches the current active timer to verify it matches the ID.
 * - Appends a new entry to `checkInStatuses`.
 * 
 * @param timerId - Firestore document ID of the timer.
 * @param status - 'completed' or 'missed'.
 * @param time - ISO string of when the check-in was logged.
 */
export const logCheckInStatus = async (timerId: string, status: 'completed' | 'missed', time: string): Promise<void> => {
  try {
    const db = getFirestore();
    const timerRef = doc(db, 'timers', timerId);

    const timer = await getActiveTimer();

    if (!timer || timer.id !== timerId) {
      throw new Error('No active timer found or timer ID mismatch');
    }

    // Append the new check-in status to the list
    const updatedStatuses = [...(timer.checkInStatuses || []), { time, status }];

    await updateDoc(timerRef, {
      checkInStatuses: updatedStatuses
    });
  } catch (error) {
    console.error('Error logging check-in status:', error);
    throw error;
  }
};
