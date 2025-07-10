# 💬 Real-Time Multi-Room Chat App

A modern, real-time web chat application inspired by Slack and Discord. Built with **HTML**, **CSS**, **JavaScript**, and **Firebase Realtime Database**.

---

## ✨ Features

- 🔥 **Real-Time Messaging:** Instant updates for everyone in the room.
- 🗂️ **Multi-Room Support:** Click to switch between chat rooms in a sidebar.
- ➕ **Create Rooms:** Add unique chat rooms dynamically.
- 👥 **Online Users:** See who’s online in each room in real time.
- ✏️ **Typing Indicator:** Shows when other users are typing.
- 😊 **Emoji Bar:** Add quick emoji reactions.
- 🧑‍💻 **Google Login & Avatars:** Sign in with Google and chat with your profile photo.
- 🌙 **Dark/Light Mode:** Toggle between light and dark themes.
- 📱 **Responsive:** Works great on desktop and mobile.

---

## ⚙️ Tech Stack

- **HTML5 & CSS3**
- **Vanilla JavaScript (ES6)**
- **Firebase Realtime Database**
- **Firebase Authentication**

---

## 🚀 Getting Started

### 1️⃣ Clone This Repo

\`\`\`bash
git clone https://github.com/Ritik639471/RM-chat-app.git
cd RM-chat-app
\`\`\`

---

### 2️⃣ Set Up Firebase

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication → Sign-In Method → Google**.
3. Enable **Realtime Database** (start in test mode for development).
4. Add your local domain (`localhost`, `127.0.0.1`) and your deployed domain (e.g. `your-app.netlify.app`) under **Authentication → Settings → Authorized Domains**.
5. Copy your Firebase config from **Project Settings → General**.

Replace the placeholder in **\`firebase-config.js\`**:

```javascript
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
window.database = firebase.database();
window.auth = firebase.auth();
```

---

### 3️⃣ Deploy

You can deploy easily using **Netlify**, **Vercel**, or **GitHub Pages**.

For **Netlify**:
- Push your code to GitHub.
- Connect your repo to Netlify.
- Add your Netlify domain to your Firebase Authorized Domains.
- Deploy & chat!

---

## 🔒 Example Firebase Rules (Development)

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

---

## 🚀 Live Demo

👉 [rm-chat.netlify.app](https://rm-chat.netlify.app/)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to fork, improve, and use it for your own projects!

---

## 🙌 Author

Built with ❤️ by **Ritik Maurya**  
Feedback & contributions welcome!

[GitHub](https://github.com/Ritik639471)

---

Happy building & chatting! 🚀✨
