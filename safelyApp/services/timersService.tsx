// Firestore interactions for timers

import { getAuth } from 'firebase/auth'; // Used to access the current authenticated user
import { collection, addDoc, getFirestore, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Firestore methods for database operations

// Define the Timer interface to enforce structure for timer objects in TypeScript
export interface Timer {
  id: string; 
  uid: string; // User ID of the authenticated user who created the timer
  minutes: number; // Duration of the timer in minutes
  createdAt: string; // ISO string representing when the timer was created
  startTime: string; // ISO string for when the timer started
  timerName: string; 
  checkIns: number; // Number of check-in points during the timer
  checkInIntervals: number[]; // Array of intervals (in milliseconds) for check-ins
  checkInStatuses: { time: string; status: 'completed' | 'missed' }[]; // Array tracking check-in statuses with timestamps
  isActive: boolean; 
}

// Function to save a new timer to Firestore
export const saveTimer = async (minutes: number, tName: string, checkIns: number): Promise<string> => {
  try {
    // Get the authentication instance to access the current user
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if there is an authenticated user; throw an error if not
    if (!user) {
      throw new Error('No authenticated user');
    }

    // Check if the user already has an active timer to prevent multiple active timers
    const activeTimer = await getActiveTimer();
    if (activeTimer) {
      throw new Error('You already have an active timer. Please wait until it finishes.');
    }

    // Initialize Firestore database instance
    const db = getFirestore();
    const timersRef = collection(db, 'timers');
    // Get the current timestamp in ISO format for timer creation and start
    const startTime = new Date().toISOString();

    // Calculate check-in intervals in milliseconds based on the number of check-ins
    // If checkIns > 0, divide the total timer duration into equal intervals
    const checkInIntervals = checkIns > 0
      ? Array.from(
          { length: checkIns },
          (_, i) => Math.round((minutes / checkIns) * (i + 1) * 60 * 1000) // Convert minutes to milliseconds
        )
      : []; // Empty array if no check-ins are specified


    // Add a new timer document to the 'timers' collection with the specified data
    const docRef = await addDoc(timersRef, {
      uid: user.uid, 
      minutes, 
      createdAt: startTime, 
      startTime, 
      timerName: tName, 
      checkIns, 
      checkInIntervals, 
      checkInStatuses: [], // Initialize empty array for check-in statuses
      isActive: true 
    });

    // Return the ID of the newly created timer document
    return docRef.id;


  } catch (error) {
    console.error('Error saving timer:', error);
    throw error;
  }
};

// Function to retrieve the user's currently active timer from Firestore
export const getActiveTimer = async (): Promise<Timer | null> => {
  try {
    // Get the authentication instance to access the current user
    const auth = getAuth();
    const user = auth.currentUser;


    if (!user) {
      throw new Error('No authenticated user');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');

    // Create a query to find active timers for the current user
    const q = query(
      timersRef,
      where('uid', '==', user.uid), // Match the user's ID
      where('isActive', '==', true) // Only return active timers
    );

    // Execute the query to get matching documents
    const querySnapshot = await getDocs(q);

    // If no active timers are found, return null
    if (querySnapshot.empty) {
      return null;
    }

    // Get the first active timer document
    const timerDoc = querySnapshot.docs[0];

    // Return the timer data with its ID as a Timer object
    return {
      id: timerDoc.id,
      ...timerDoc.data()
    } as Timer;

  } catch (error) {
    console.error('Error fetching active timer:', error);
    throw error;
  }
};

// Function to mark a timer as inactive in Firestore
export const markTimerInactive = async (timerId: string): Promise<void> => {
  try {
    const db = getFirestore();
    // Reference to the specific timer document by its ID
    const timerRef = doc(db, 'timers', timerId);

    // Update the timer's isActive field to false
    await updateDoc(timerRef, {
      isActive: false
    });

  } catch (error) {
    console.error('Error marking timer as inactive:', error);
    throw error;
  }
};

// Function to log a check-in status (completed or missed) for a timer
export const logCheckInStatus = async (timerId: string, status: 'completed' | 'missed', time: string): Promise<void> => {
  try {
    const db = getFirestore();

    // Reference to the specific timer document by its ID
    const timerRef = doc(db, 'timers', timerId);

    // Fetch the current active timer to verify it exists and matches the provided ID
    const timer = await getActiveTimer();

    // Check if the timer exists and its ID matches; throw an error if not
    if (!timer || timer.id !== timerId) {
      throw new Error('No active timer found or timer ID mismatch');
    }


    // Append the new check-in status to the existing array of statuses
    const updatedStatuses = [...(timer.checkInStatuses || []), { time, status }];
    // Update the timer's checkInStatuses field in Firestore
    await updateDoc(timerRef, {
      checkInStatuses: updatedStatuses
    });


  } catch (error) {
    console.error('Error logging check-in status:', error);
    throw error;
  }
};