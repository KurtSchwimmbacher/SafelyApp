import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

export const saveTimer = async (minutes: number, tName: string, checkIns: number) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');

    // Calculate check-in intervals if checkIns is greater than 0
    const checkInIntervals = checkIns > 0 ? Array.from(
      { length: checkIns },
      (_, i) => Math.round((minutes / checkIns) * (i + 1) * 60 * 1000) // Convert to milliseconds
    ) : [];

    await addDoc(timersRef, {
      uid: user.uid,
      minutes,
      createdAt: new Date().toISOString(),
      timerName: tName,
      checkIns,
      checkInIntervals
    });

    console.log('Timer saved successfully');
  } catch (error) {
    console.error('Error saving timer:', error);
    throw error;
  }
};