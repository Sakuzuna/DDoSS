const ws = new WebSocket('ws://localhost:5252');

ws.onmessage = (event) => {
    document.getElementById('logBox').innerText += `${event.data}\n`;
};

document.getElementById('startAttack').addEventListener('click', () => {
    const targetUrl = document.getElementById('targetUrl').value;
    const attackMethod = document.getElementById('attackMethod').value;

    if (!targetUrl || !attackMethod) {
        alert('Please enter a target URL and select an attack method.');
        return;
    }

    fetch('/start-attack', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ targetUrl, attackMethod })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('logBox').innerText += `Attack started: ${data.message}\n`;
    })
    .catch(error => {
        document.getElementById('logBox').innerText += `Error: ${error.message}\n`;
    });
});
