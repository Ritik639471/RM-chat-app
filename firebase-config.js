// Replace with YOUR Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyCv7aHlIcVFefxcyS3B882R8z-oC19jEm8",
  authDomain: "rm-chat-app-p.firebaseapp.com",
  databaseURL: "https://rm-chat-app-p-default-rtdb.firebaseio.com",
  projectId: "rm-chat-app-p",
  storageBucket: "rm-chat-app-p.firebasestorage.app",
  messagingSenderId: "409758732720",
  appId: "1:409758732720:web:fa97c10967ed91ce110675"
};

firebase.initializeApp(firebaseConfig);
window.database = firebase.database();
window.auth = firebase.auth();
window.googleProvider = new firebase.auth.GoogleAuthProvider();