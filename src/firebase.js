// Firebase configuration
// TODO: Replace with your Firebase project config after running `firebase init`
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "PLACEHOLDER",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "PLACEHOLDER",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "PLACEHOLDER",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "PLACEHOLDER",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "PLACEHOLDER",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "PLACEHOLDER",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "PLACEHOLDER",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
export default app;
