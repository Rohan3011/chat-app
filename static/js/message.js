
const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
const userName = JSON.parse(document.getElementById('json-username').textContent);

const send = document.getElementById('send-message')
const chatbox = document.getElementById('chatbox')

let ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
const chatSocket = new WebSocket(
    ws_scheme
    + '://'
    + window.location.host
    + '/ws/'
    + roomName
    + '/'
);

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if (!data.message) {
        alert("The message was empty!");
        return;
    }
    let html = `<div class="p-4 bg-gray-200 rounded-xl">`;
    html += `<p class="font-semibold">${data.username}</p>`;
    html += ` <p>${data.message}</p>  </div>`;
    chatbox.innerHTML += html;
    scrollToBottom();

}

chatSocket.onclose = function (e) {
    console.log('close');
}

chatSocket.onopen = function (e) {
    console.log('open', e)
};

chatSocket.onerror = function (e) {
    console.log('error', e)
}




send.onclick = function (e) {
    e.preventDefault();
    const messageContent = document.querySelector('#message-field');
    const message = messageContent.value;

    chatSocket.send(JSON.stringify({
        "message": message,
        "username": userName,
        "room": roomName
    }))

    console.log({
        "message": message,
        "username": userName,
        "room": roomName
    })

    messageContent.value = "";

    return false;
}


function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}