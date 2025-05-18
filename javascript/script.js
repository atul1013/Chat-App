function loadMessages() {
    fetch('chat.php')
      .then(res => res.json())
      .then(data => {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = '';
        data.forEach(msg => {
          chatBox.innerHTML += `<div><strong>${msg.username}:</strong> ${msg.message}</div>`;
        });
        chatBox.scrollTop = chatBox.scrollHeight;
      });
  }
  
  document.getElementById('chat-form').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (!username || !message) return;
  
    fetch('chat.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}`
    }).then(() => {
      document.getElementById('message').value = '';
      loadMessages();
    });
  });
  
  setInterval(loadMessages, 2000);
  window.onload = loadMessages;
  
