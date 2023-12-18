document.getElementById('send-btn').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    input.value = '';

    if (message) {
        addMessageToChat('user-message', 'Tú', message);

        fetch('http://localhost:3000/consultar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.respuesta) {
                addMessageToChat('bot-message', 'Chatbot', data.respuesta);
            } else {
                addMessageToChat('bot-message', 'Chatbot', 'No hubo respuesta del chatbot.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addMessageToChat('bot-message', 'Chatbot', 'Hubo un error al procesar tu mensaje.');
        });
    }
});

function addMessageToChat(className, sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(className);
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('toggle-chat').addEventListener('click', function() {
    const chatBox = document.getElementById('chat-box');
    const inputArea = document.querySelector('.input-area');
    chatBox.classList.toggle('minimized');
    inputArea.classList.toggle('minimized');
    this.textContent = chatBox.classList.contains('minimized') ? '+' : '-';
});
