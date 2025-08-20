import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Timer } from './timersService';

/**
 * Interface for dashboard summary data.
 */
export interface DashboardSummary {
  totalHours: number; // Total hours logged across all timers
  timerNameCounts: { name: string; count: number }[]; // Timer names and their frequency
}

/**
 * Fetches dashboard summary data for the authenticated user.
 * - Retrieves all timers for the user from Firestore.
 * - Calculates total hours from timer durations.
 * - Counts frequency of timer names, sorted by count (descending).
 * 
 * @returns DashboardSummary object with total hours and timer name counts.
 */
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user');
    }

    const db = getFirestore();
    const timersRef = collection(db, 'timers');
    const q = query(timersRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    let totalMinutes = 0;
    const timerNameMap: { [key: string]: number } = {};

    querySnapshot.forEach((doc) => {
      const timer = doc.data() as Timer;
      totalMinutes += timer.minutes;

      // Count timer names (use "Unnamed" for empty or undefined names)
      const timerName = timer.timerName || 'Unnamed';
      timerNameMap[timerName] = (timerNameMap[timerName] || 0) + 1;
    });

    // Convert minutes to hours (rounded to 2 decimal places)
    const totalHours = Number((totalMinutes / 60).toFixed(2));

    // Convert timerNameMap to sorted array
    const timerNameCounts = Object.entries(timerNameMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort by count, descending

    return {
      totalHours,
      timerNameCounts,
    };
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw error;
  }
};