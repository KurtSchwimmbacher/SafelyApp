import { getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

export const saveTimer = async (minutes: number, tName: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');

    await addDoc(timersRef, {
      uid: user.uid,
      minutes,
      createdAt: new Date().toISOString(),
      timerName: tName
    });

    console.log('Timer saved successfully');
  } catch (error) {
    console.error('Error saving timer:', error);
    throw error;
  }
};