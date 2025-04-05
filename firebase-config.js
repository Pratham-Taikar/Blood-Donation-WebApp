// Import Firebase SDK from URL
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVhoPVIFn_rcfXz7qukiUTd6Q23cHOUTY",
  authDomain: "chat-application-simple-bbcae.firebaseapp.com",
  projectId: "chat-application-simple-bbcae",
  storageBucket: "chat-application-simple-bbcae.firebasestorage.app",
  messagingSenderId: "720503903692",
  appId: "1:720503903692:web:ea9ff20b2ae5cc6b68b969",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
