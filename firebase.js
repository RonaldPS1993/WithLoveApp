// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLP_8bhh9MPVuiycaXdlnnyZrTWGhezv4",
  authDomain: "withloveapp-e050f.firebaseapp.com",
  projectId: "withloveapp-e050f",
  storageBucket: "withloveapp-e050f.firebasestorage.app",
  messagingSenderId: "655675720814",
  appId: "1:655675720814:web:f208b17dc8e0182328127f",
  measurementId: "G-3FLSQ30KVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
