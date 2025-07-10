const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');
const typingStatusDiv = document.getElementById('typing-status');
const roomNameSpan = document.getElementById('room-name');
const themeToggle = document.getElementById('theme-toggle');
const roomList = document.getElementById('room-list');
const addRoomBtn = document.getElementById('add-room');
const onlineUsersList = document.getElementById('online-users');


let username = '';
let room = '';
let messagesRef = null;

joinBtn.onclick = () => {
  username = usernameInput.value.trim();

  // 1st: try dropdown selection
  room = loginRoomSelect.value;

  // If blank, use custom input
  if (!room) {
    const custom = newRoomInput.value.trim();
    if (custom) {
      room = custom;
      database.ref(`rooms/${room}`).set(true); // auto create if new
    } else {
      alert('Pick or enter a room!');
      return;
    }
  }

  if (username && room) {
    loginDiv.style.display = 'none';
    chatDiv.style.display = 'block';
    roomNameSpan.textContent = room;

    listenForMessages();
    loadRooms();
    updatePresence();
  }
};
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Load rooms for login dropdown
  loadRoomsForLogin();
});

const loginRoomSelect = document.getElementById('login-room');
const newRoomInput = document.getElementById('new-room');

function loadRoomsForLogin() {
  const roomsRef = database.ref('rooms');
  roomsRef.on('value', snapshot => {
    const rooms = snapshot.val() || {};
    loginRoomSelect.innerHTML = `<option value="" disabled selected>Select a room</option>`;
    Object.keys(rooms).forEach(r => {
      const option = document.createElement('option');
      option.value = r;
      option.textContent = r;
      loginRoomSelect.appendChild(option);
    });
  });
}


sendBtn.onclick = () => {
  const msg = messageInput.value.trim();
  if (msg) {
    const timestamp = new Date().toLocaleTimeString();
    const avatar = `https://avatars.dicebear.com/api/initials/${username}.svg`;

    database.ref(`messages/${room}`).push({
      user: username,
      message: msg,
      time: timestamp,
      avatar: avatar
    });

    messageInput.value = '';
    removeTypingStatus();
  }
};

function listenForMessages() {
  if (messagesRef) {
    messagesRef.off();
  }

  messagesDiv.innerHTML = '';

  messagesRef = database.ref(`messages/${room}`);
  messagesRef.on('child_added', snapshot => {
    const msg = snapshot.val();
    const msgEl = document.createElement('div');

    msgEl.classList.add('message-tile');
    if (msg.user === username) {
      msgEl.classList.add('own-message');
    }

    msgEl.innerHTML = `
      <img src="${msg.avatar}" width="24" style="vertical-align: middle; border-radius: 50%;" />
      <strong>${msg.user}</strong> [${msg.time}]<br>
      ${msg.message}
    `;

    messagesDiv.appendChild(msgEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  roomNameSpan.textContent = room;
}

const typingRef = database.ref('typing');

messageInput.addEventListener('input', () => {
  typingRef.child(username).set({ room: room });

  clearTimeout(window.typingTimeout);
  window.typingTimeout = setTimeout(removeTypingStatus, 2000);
});

function removeTypingStatus() {
  typingRef.child(username).remove();
}

typingRef.on('value', snapshot => {
  const typingUsers = snapshot.val() || {};
  const otherTyping = Object.keys(typingUsers).filter(u => u !== username && typingUsers[u].room === room);
  typingStatusDiv.textContent = otherTyping.length
    ? `${otherTyping.join(', ')} ${otherTyping.length > 1 ? 'are' : 'is'} typing...`
    : '';
});

document.querySelectorAll('#emoji-bar button').forEach(btn => {
  btn.onclick = () => {
    messageInput.value += btn.textContent;
    messageInput.focus();
  };
});

themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
};

addRoomBtn.onclick = () => {
  const newRoom = prompt("Enter new room name:");
  if (newRoom) {
    database.ref(`rooms/${newRoom}`).set(true);
  }
};

const roomSelect = document.getElementById('room-select');

function loadRooms() {
  const roomsRef = database.ref('rooms');
  roomsRef.on('value', snapshot => {
    const rooms = snapshot.val() || {};
    roomSelect.innerHTML = '';
    Object.keys(rooms).forEach(r => {
      const option = document.createElement('option');
      option.value = r;
      option.textContent = r;
      roomSelect.appendChild(option);
    });

    // Select current room if exists
    if (rooms[room]) {
      roomSelect.value = room;
    }
  });
}

// Switch room on selection
roomSelect.onchange = () => {
  room = roomSelect.value;
  listenForMessages();
  updatePresence();
};


function updatePresence() {
  const userRef = database.ref(`online/${room}/${username}`);
  userRef.set(true);
  userRef.onDisconnect().remove();

  database.ref(`online/${room}`).on('value', snapshot => {
    const online = snapshot.val() || {};
    onlineUsersList.innerHTML = '';
    Object.keys(online).forEach(user => {
      const li = document.createElement('li');
      li.textContent = user;
      onlineUsersList.appendChild(li);
    });
  });
}
