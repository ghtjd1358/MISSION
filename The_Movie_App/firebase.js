// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8vnybaKLisZkMQLjYXlfDogZosItBBhA",
  authDomain: "react-native-todo-86c50.firebaseapp.com",
  projectId: "react-native-todo-86c50",
  storageBucket: "react-native-todo-86c50.appspot.com",
  messagingSenderId: "1042985460167",
  appId: "1:1042985460167:web:9b4e41e90e8c30f8b0b9e2"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);


 export default app