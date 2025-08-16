import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface userProfile {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    notifications: boolean;
    notificationsEnabled?: boolean;
    contactsShared: boolean;
    createdAt: string;
}

export const createUserProfile = async (profile: userProfile) => {
    const userRef = doc(db, "users", profile.uid);
    await setDoc(userRef, profile);
}