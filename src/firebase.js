// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsYLytjYSPAtGos8qIh6ZookhsmqbzZac",
  authDomain: "react-disney-plus-app-365c5.firebaseapp.com",
  projectId: "react-disney-plus-app-365c5",
  storageBucket: "react-disney-plus-app-365c5.appspot.com",
  messagingSenderId: "470037122198",
  appId: "1:470037122198:web:f60a8d0e085db8ed3046b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;