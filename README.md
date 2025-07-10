# 💬 Real-Time Multi-Room Chat App

A modern, real-time chat web application inspired by Slack and Discord, built with **HTML**, **CSS**, **JavaScript**, and **Firebase Realtime Database**.

---

## ✨ Features

- 🔥 **Real-Time Messaging:** Chat updates instantly for everyone in the room.
- 🔍 **Searchable Rooms:** Pick or switch chat rooms using a searchable dropdown.
- ➕ **Create New Rooms:** Add new chat rooms dynamically.
- 👥 **Online Users:** See who’s online in each room in real time.
- ✏️ **Typing Status:** Shows when other users are typing.
- 😊 **Emoji Bar:** Add quick emoji reactions to messages.
- 🌙 **Dark/Light Mode:** Toggle between light and dark themes.
- 📱 **Responsive:** Works smoothly on desktop and mobile browsers.

---

## ⚙️ Technologies Used

- **HTML5 & CSS3**
- **Vanilla JavaScript (ES6)**
- **Firebase Realtime Database**

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ritik639471/RM-chat-app.git
cd real-time-chat-app


2️⃣ Add your Firebase config
Go to Firebase Console and create a new project.

Enable Realtime Database (in test mode for development).

Copy your Firebase config from Project Settings.

Replace the placeholder config in firebase-config.js:

javascript
Copy code
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

📄 License
This project is licensed under the MIT License — feel free to fork, modify, and use it for your own experiments!


🙌 Author
Built with ❤️ by Ritik Maurya — contributions and feedback welcome!