import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  addDoc, 
  collection 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔴 PASTE YOUR FIREBASE CONFIG HERE */
const firebaseConfig = {
  apiKey: "AIzaSyBnNB_WF7khWn_6Iti0b1IwB2S9RCm5jTE",
  authDomain: "social-boost-20ba7.firebaseapp.com",
  projectId: "social-boost-20ba7",
  storageBucket: "social-boost-20ba7.firebasestorage.app",
  messagingSenderId: "740830401596",
  appId: "1:740830401596:web:c41d41f08495ab4d56df39",
  measurementId: "G-WDEHT15SPW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

/* AUTH STATE */
onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.classList.add("hidden");
    dashboard.classList.remove("hidden");
  } else {
    loginBox.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});

/* AUTH FUNCTIONS */
window.login = () =>
  signInWithEmailAndPassword(auth, email.value, password.value);

window.signup = () =>
  createUserWithEmailAndPassword(auth, email.value, password.value);

window.googleLogin = () =>
  signInWithPopup(auth, provider);

window.logout = () =>
  signOut(auth);

/* PAYMENT UI */
window.showPayment = (v) => {
  upi.classList.add("hidden");
  qr.classList.add("hidden");
  if (v === "upi") upi.classList.remove("hidden");
  if (v === "qr") qr.classList.remove("hidden");
};

/* ORDER SAVE */
window.placeOrder = async () => {
  const user = auth.currentUser;
  if (!user) return alert("Login first");

  await addDoc(collection(db, "orders"), {
    uid: user.uid,
    email: user.email,
    service: service.value,
    link: link.value,
    quantity: qty.value,
    status: "pending",
    time: new Date()
  });

  alert("Order placed successfully");
};