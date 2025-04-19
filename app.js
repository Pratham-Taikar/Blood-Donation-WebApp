import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

window.login = function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "./mainLandingPage.html"; // This should redirect
    })
    .catch((error) => {
      alert(error.message);
    });
};

window.signup = function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let fullName = document.getElementById("fullName").value;
  let bloodGroup = document.getElementById("blood-grp").value;
  let contactNo = document.getElementById("contactNo").value;
  let city = document.getElementById("city").value;

  const obj = {
    email,
    password,
    fullName,
    bloodGroup,
    contactNo,
    city,
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful! Please login.");
    })
    .catch((error) => {
      alert(error.message);
    });
};
