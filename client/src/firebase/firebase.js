import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnTzQf7gW7Xu41aHO2kg7WH-kd1jcDnFQ",
  authDomain: "durak-app-3db83.firebaseapp.com",
  databaseURL: "https://durak-app-3db83.firebaseio.com",
  projectId: "durak-app-3db83",
  storageBucket: "durak-app-3db83.appspot.com",
  messagingSenderId: "514119892684",
  appId: "1:514119892684:web:8096f33a514630ecdf4c69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
