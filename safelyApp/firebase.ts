// Firebase core
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase auth for React Native
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Async storage
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkljYbBnbblDNTdQGbS1r0RGh3l6sqG4U",
  authDomain: "safelydv300classproj.firebaseapp.com",
  projectId: "safelydv300classproj",
  storageBucket: "safelydv300classproj.firebasestorage.app",
  messagingSenderId: "130552682344",
  appId: "1:130552682344:web:f4346a2857acb59cc7e8dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
