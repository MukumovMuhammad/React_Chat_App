// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-rf9kFPzvuWzCza0qXlg8eOHLYoMo2uI",
    authDomain: "react-chat-app-52cee.firebaseapp.com",
    projectId: "react-chat-app-52cee",
    storageBucket: "react-chat-app-52cee.appspot.com",
    messagingSenderId: "949915137523",
    appId: "1:949915137523:web:01f059d84d08500f3a0e86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);