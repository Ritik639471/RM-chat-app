const googleLoginBtn = document.getElementById('google-login');
const signOutBtn = document.getElementById('sign-out');
const toggleThemeBtn = document.getElementById('toggle-theme');
const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const roomList = document.getElementById('room-list');
const addRoomBtn = document.getElementById('add-room');
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');
const roomNameSpan = document.getElementById('room-name');
const onlineUsersList = document.getElementById('online-users');
const typingStatus = document.getElementById('typing-status');
const emojiBar = document.getElementById('emoji-bar');

let username = '';
let avatar = '';
let room = 'general';


googleLoginBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      username = user.displayName;
      avatar = user.photoURL || `https://avatars.dicebear.com/api/initials/${username}.svg`;

      loginDiv.style.display = 'none';
      chatDiv.style.display = 'flex';

      loadRooms();
      switchRoom(room);
      updatePresence();
      updateNavbar();
    })
    .catch(console.error);
};


auth.onAuthStateChanged(user => {
  if (user) {
    username = user.displayName;
    avatar = user.photoURL || `https://avatars.dicebear.com/api/initials/${username}.svg`;
    if (loginDiv && chatDiv) {
      loginDiv.style.display = 'none';
      chatDiv.style.display = 'flex';
    }
    updateNavbar();
    loadRooms();
    switchRoom(room);
    updatePresence();
  } else {
    loginDiv.style.display = 'flex';
    chatDiv.style.display = 'none';
  }
});


signOutBtn.onclick = () => {
  auth.signOut().then(() => location.reload());
};


toggleThemeBtn.onclick = () => {
  document.body.classList.toggle('dark');
};


function updateNavbar() {
  const navbarUser = document.getElementById('navbar-user');
  navbarUser.innerHTML = `
    <span>${username}</span>
    <img src="${avatar}" alt="avatar" />
  `;
}


function loadRooms() {
  database.ref('rooms').on('value', snapshot => {
    const rooms = snapshot.val() || {};
    roomList.innerHTML = '';
    Object.keys(rooms).forEach(r => {
      const li = document.createElement('li');
      li.textContent = r;
      li.onclick = () => {
        room = r;
        switchRoom(room);
        updatePresence();
      };
      roomList.appendChild(li);
    });
  });
}


addRoomBtn.onclick = () => {
  const newRoom = prompt("Enter new room name:");
  if (newRoom) {
    const cleanRoom = newRoom.trim().toLowerCase().replace(/\s+/g, '-');
    const roomsRef = database.ref(`rooms/${cleanRoom}`);
    roomsRef.once('value', snapshot => {
      if (snapshot.exists()) {
        alert("Room already exists!");
      } else {
        roomsRef.set(true);
        room = cleanRoom;
        switchRoom(room);
        updatePresence();
      }
    });
  }
};


sendBtn.onclick = () => {
  const message = messageInput.value.trim();
  if (message) {
    const msgData = {
      user: username,
      message: message,
      time: new Date().toLocaleTimeString(),
      avatar: avatar
    };
    database.ref(`messages/${room}`).push(msgData);
    messageInput.value = '';
  }
};


function switchRoom(selectedRoom) {
  room = selectedRoom;
  roomNameSpan.textContent = room;
  messagesDiv.innerHTML = '';
  database.ref(`messages/${room}`).off();
  database.ref(`messages/${room}`).on('child_added', snapshot => {
    const msg = snapshot.val();
    const div = document.createElement('div');
    div.classList.add('msg');
    div.innerHTML = `
      <img src="${msg.avatar}" alt="avatar">
      <div class="bubble">
        <strong>${msg.user}:</strong> ${msg.message} <small>(${msg.time})</small>
      </div>
    `;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  database.ref(`typing/${room}`).off();
  database.ref(`typing/${room}`).on('value', snapshot => {
    const typers = snapshot.val() || {};
    const typingUsers = Object.keys(typers).filter(u => u !== username);
    typingStatus.textContent = typingUsers.length ? `${typingUsers.join(', ')} typing...` : '';
  });
}


function updatePresence() {
  const onlineRef = database.ref(`online/${room}/${username}`);
  onlineRef.set(true);
  onlineRef.onDisconnect().remove();

  database.ref(`online/${room}`).on('value', snapshot => {
    const users = snapshot.val() || {};
    onlineUsersList.innerHTML = '';
    Object.keys(users).forEach(u => {
      const li = document.createElement('li');
      li.textContent = u;
      onlineUsersList.appendChild(li);
    });
  });
}


if (messageInput) {
  messageInput.addEventListener('input', () => {
    database.ref(`typing/${room}/${username}`).set(true);
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      database.ref(`typing/${room}/${username}`).remove();
    }, 1000);
  });
}

if (emojiBar) {
  emojiBar.addEventListener('click', e => {
    if (e.target.tagName === 'SPAN') {
      messageInput.value += e.target.textContent;
    }
  });
}
