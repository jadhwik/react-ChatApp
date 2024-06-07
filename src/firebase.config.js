// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeabQsYik_Lc-UArmur38vljyNU9oYg6w",
  authDomain: "chat-app-5e557.firebaseapp.com",
  projectId: "chat-app-5e557",
  storageBucket: "chat-app-5e557.appspot.com",
  messagingSenderId: "196564681764",
  appId: "1:196564681764:web:1ba57a08420b4e6cd044b1",
  measurementId: "G-FS61ZGNVND"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db= getFirestore(app);
 const storage=getStorage(app);
  const googleProvider = new GoogleAuthProvider();
 export{auth,app,db,googleProvider,storage};