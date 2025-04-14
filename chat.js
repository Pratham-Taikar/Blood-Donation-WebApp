import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const username = JSON.parse(localStorage.getItem("obj"))?.fullName;
console.log(username);

// Get references
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

// Function to send message
window.sendMessage = async function () {
  const message = messageInput.value;
  const user = auth.currentUser;

  if (message.trim() === "" || !user) return;

  await addDoc(collection(db, "messages"), {
    text: message,
    uid: user.uid,
    Username: username,
    timestamp: new Date(),
  });

  messageInput.value = "";
};

// Function to receive messages in real-time
const loadMessages = () => {
  const q = query(collection(db, "messages"), orderBy("timestamp"));

  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const messageDiv = document.createElement("div");
      const usernameDiv = document.createElement("div");

      // Username in bold
      usernameDiv.innerText = msg.Username;
      usernameDiv.style.fontWeight = "bold";

      // Determine whether the message is sent or received and apply the styles accordingly
      if (msg.uid === auth.currentUser.uid) {
        messageDiv.classList.add("message", "sent");
        messageDiv.innerText = `${msg.text}`;
        usernameDiv.style.textAlign = "right"; // Right-align for sent messages
      } else {
        messageDiv.classList.add("message", "received");
        messageDiv.innerText = `${msg.text}`;
        usernameDiv.style.textAlign = "left"; // Left-align for received messages
      }

      // Append username above the message
      messageDiv.prepend(usernameDiv); // Put username above the message
      chatBox.appendChild(messageDiv);
    });

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
  });
};

// Load messages on page load
auth.onAuthStateChanged((user) => {
  if (user) {
    loadMessages();
  } else {
    window.location.href = "./Login.html"; // Redirect if not logged in
  }
});
