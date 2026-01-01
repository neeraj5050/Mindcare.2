import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2PUpfmkJCBB_mTj3F2LyOgjXoERV6DVM",
  authDomain: "my-hackthone.firebaseapp.com",
  projectId: "my-hackthone",
 storageBucket: "my-hackthone.firebasestorage.app",
  messagingSenderId: "237350413840",
  appId: "1:237350413840:web:3ed52c4bd91f7b8e850c95",
  measurementId: "G-BDBWQ7YGBE"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);