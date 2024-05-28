// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'ghar-dekho-com.firebaseapp.com',
  projectId: 'ghar-dekho-com',
  storageBucket: 'ghar-dekho-com.appspot.com',
  messagingSenderId: '931573174422',
  appId: '1:931573174422:web:629a521b75a7d3493e72b7',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
