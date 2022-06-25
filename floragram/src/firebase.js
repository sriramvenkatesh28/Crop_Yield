import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9b7ndf_9Ep3iN4smmxN6dzegwF9EroXg",
  authDomain: "floragram-246c9.firebaseapp.com",
  projectId: "floragram-246c9",
  storageBucket: "floragram-246c9.appspot.com",
  messagingSenderId: "1068344296629",
  appId: "1:1068344296629:web:ec21e99ebdf8d6ae20aafc",
  measurementId: "G-28W5FEBCKJ"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
