// services/authService.ts
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { auth } from "../firebase";

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential;
};

export const getUserInfo = () => {
  const user = auth.currentUser;
  return user ?? null;
};
