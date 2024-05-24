// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAsro08r7wbQnx4FTmqakqt0eC4EPaaeJQ",
  authDomain: "chat-app-69cd4.firebaseapp.com",
  projectId: "chat-app-69cd4",
  storageBucket: "chat-app-69cd4.appspot.com",
  messagingSenderId: "613072190488",
  appId: "1:613072190488:web:46a0323fd27ca64f9e576d",
  measurementId: "G-XMT1LDXC0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const database = getAuth(app);
 export{database,app};