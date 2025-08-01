// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
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

// Initialise all our services for our firebase app
export const auth = getAuth(app); // links to the auth services to our app -> need to use this auth variable
