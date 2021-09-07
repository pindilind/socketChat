

socket.on('msgInput', (incoming) => {

    const msgList = document.getElementById('messages')
    let msgListItem = document.createElement("li")
    msgListItem.innerText = incoming.msgInput
    msgList.appendChild(msgListItem) 
})

function submitMsg() {
    const chatInput = document.getElementById("msgInput")
    const msgInput = chatInput.value 
    msgInput.value = ""
    socket.emit('msgInput', {msgInput})
}