// const socket = io();
const socket = io({
  auth: {
    serverOffset: 0
  }
});
// const form = document.getElementById('form');
// const input = document.getElementById('input');
// const messages = document.getElementById('messages');
// const toggleButton = document.getElementById('toggle-btn');

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (input.value) {
//         //  user send the chat message event
//       socket.emit('chat message', input.value);
//       input.value = '';
//     }
//   });


//   toggleButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (socket.connected) {
//       toggleButton.innerText = 'Connect';
//       socket.disconnect();
//     } else {
//       toggleButton.innerText = 'Disconnect';
//       socket.connect();
//     }
//   });


//   socket.on('chat message', (msg) => {
//     console.log(msg);
//     const item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//   });

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg, serverOffset) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});