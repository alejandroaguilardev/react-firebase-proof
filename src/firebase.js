// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQsAKqxbGdS-P2ir1W7uNiXn5QjrRg99s",
  authDomain: "fb-crud-react-301cb.firebaseapp.com",
  projectId: "fb-crud-react-301cb",
  storageBucket: "fb-crud-react-301cb.appspot.com",
  messagingSenderId: "27485782718",
  appId: "1:27485782718:web:9884f1d33d60d48986d4ef"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();