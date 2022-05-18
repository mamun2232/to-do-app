// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChbQGoOM5PSUKt_WlEPtDWYDcSr_D1qIo",
  authDomain: "to-do-app-254ba.firebaseapp.com",
  projectId: "to-do-app-254ba",
  storageBucket: "to-do-app-254ba.appspot.com",
  messagingSenderId: "1007671283714",
  appId: "1:1007671283714:web:e1faaf48a6080c7eccd71b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth