import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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
    hasOnboarded: boolean;
}

export const createUserProfile = async (profile: userProfile) => {
    const userRef = doc(db, "users", profile.uid);
    await setDoc(userRef, { ...profile, hasOnboarded: false });
}

export const updateUserOnboardingStatus = async (uid: string, hasOnboarded: boolean) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { hasOnboarded });
}

export const getUserProfile = async (uid: string): Promise<userProfile | null> => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data() as userProfile;
    }
    return null;
}

export const updateUserProfile = async (uid: string, updates: Partial<userProfile>) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updates);
};

import { deleteDoc } from 'firebase/firestore';

export const deleteUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
};