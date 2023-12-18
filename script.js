document.getElementById('send-btn').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    input.value = '';

    if (message) {
        addMessageToChat('Tú', message);

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
                addMessageToChat('Chatbot', data.respuesta);
            } else {
                addMessageToChat('Chatbot', 'No hubo respuesta del chatbot.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addMessageToChat('Chatbot', 'Hubo un error al procesar tu mensaje.');
        });
    }
});

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
