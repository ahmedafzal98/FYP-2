// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTYAapwmm_O58SHVotNLC-sWDfe5iwijg",
  authDomain: "news-app-586a0.firebaseapp.com",
  projectId: "news-app-586a0",
  storageBucket: "news-app-586a0.firebasestorage.app",
  messagingSenderId: "364146933600",
  appId: "1:364146933600:web:bfa5ebb69e2e478de4a805",
  measurementId: "G-JFXTTDX3V3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
