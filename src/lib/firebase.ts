import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfhXRa1EtHOyPLfe9EY8ZYPAnVGW3M-zc",
  authDomain: "cage-interview-scorecard-ed200.firebaseapp.com",
  projectId: "cage-interview-scorecard-ed200",
  storageBucket: "cage-interview-scorecard-ed200.firebasestorage.app",
  messagingSenderId: "60347575198",
  appId: "1:60347575198:web:dbbc8bd5b4831ab34b6357",
  measurementId: "G-R7BXT9FFHT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});