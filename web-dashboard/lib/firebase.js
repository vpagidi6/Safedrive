import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCfYX6fZvwFVHLAqKI-0rGv6y0IUcP01CU',
  appId: '1:308505602070:web:d65323fc46c09938d92d37',
  messagingSenderId: '308505602070',
  projectId: 'safedrive-12f49',
  authDomain: 'safedrive-12f49.firebaseapp.com',
  storageBucket: 'safedrive-12f49.appspot.com',
  measurementId: 'G-Z1FQ02QC97',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
