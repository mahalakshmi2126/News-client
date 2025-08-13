// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDir_0W-lhaIOoqu2c7A2Xsni8T9F-_Wsg",
  authDomain: "news-web-app-2126.firebaseapp.com",
  projectId: "news-web-app-2126",
  storageBucket: "news-web-app-2126.appspot.com",
  messagingSenderId: "211904953853",
  appId: "1:211904953853:web:286858b3449cb8b0c62d94",
  measurementId: "G-21262163DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and export
export const messaging = getMessaging(app);