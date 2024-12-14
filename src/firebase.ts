// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgZxPLJ1Ek2kub5GihnvlnscNt4DFHbxM",
  authDomain: "projetfinal-5b18e.firebaseapp.com",
  projectId: "projetfinal-5b18e",
  storageBucket: "projetfinal-5b18e.firebasestorage.app",
  messagingSenderId: "798750383",
  appId: "1:798750383:web:28c09e6d7194fbb166865a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logInWithEmailAndPassword = async (
email: string,
password: string
) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (err: any) {
    console.error(err);
    alert(err.message);
}
};