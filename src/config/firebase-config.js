// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7N8xqa87CE8y3rTmA5RyHvRe-9-BSAQA",
  authDomain: "expense-tracker-273b3.firebaseapp.com",
  projectId: "expense-tracker-273b3",
  storageBucket: "expense-tracker-273b3.appspot.com",
  messagingSenderId: "315269003553",
  appId: "1:315269003553:web:b5aacb449db5a9d92ee660",
  measurementId: "G-LR4R7BJV1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const provider2 = new FacebookAuthProvider();
export const db = getFirestore(app);

// add scope
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');



// firebase login 
// firebase init
// firebase deploy