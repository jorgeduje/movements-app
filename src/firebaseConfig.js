import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM1yI7Rs17BCTC6xEJDIJXSn_oXg0nstU",
  authDomain: "movements-app-8f901.firebaseapp.com",
  projectId: "movements-app-8f901",
  storageBucket: "movements-app-8f901.appspot.com",
  messagingSenderId: "751048767158",
  appId: "1:751048767158:web:5e703dde3325b686995817",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
