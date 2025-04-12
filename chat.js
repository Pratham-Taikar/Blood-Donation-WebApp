import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const username = prompt("What should we call you by..");

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
      messageDiv.classList.add(
        "message",
        msg.uid === auth.currentUser.uid ? "sent" : "received"
      );
      messageDiv.innerText = `${msg.text} :${msg.Username}`;
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
    window.location.href = "index.html"; // Redirect if not logged in
  }
});
