import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export const saveTimer = async (minutes: number, tName: string, checkIns: number) => {
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

    // Calculate check-in intervals if checkIns is greater than 0
    const checkInIntervals = checkIns > 0 ? Array.from(
      { length: checkIns },
      (_, i) => Math.round((minutes / checkIns) * (i + 1) * 60 * 1000) // Convert to milliseconds
    ) : [];

    const docRef = await addDoc(timersRef, {
      uid: user.uid,
      minutes,
      createdAt: new Date().toISOString(),
      timerName: tName,
      checkIns,
      checkInIntervals,
      isActive: true
    });

    console.log('Timer saved successfully');
    return docRef.id; // Return the document ID for reference
  } catch (error) {
    console.error('Error saving timer:', error);
    throw error;
  }
};

export const getActiveTimer = async () => {
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
      return null; // No active timer found
    }

    const timerDoc = querySnapshot.docs[0];
    return {
      id: timerDoc.id,
      ...timerDoc.data()
    };
  } catch (error) {
    console.error('Error fetching active timer:', error);
    throw error;
  }
};

export const markTimerInactive = async (timerId: string) => {
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