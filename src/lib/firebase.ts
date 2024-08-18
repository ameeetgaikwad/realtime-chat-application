import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB7n-qbd1LpqgNpFl1XNsDO2tjYyEzvpZw",
    authDomain: "realtime-chat-4bd69.firebaseapp.com",
    projectId: "realtime-chat-4bd69",
    storageBucket: "realtime-chat-4bd69.appspot.com",
    messagingSenderId: "1077371179502",
    appId: "1:1077371179502:web:4c8b14d19e256d0b2dfeff",
    measurementId: "G-8GQNHYQ0ZK"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);