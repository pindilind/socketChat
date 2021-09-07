let socket = io()

socket.on('msgInput', (incomingResult) => {

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.message
    msgList.appendChild(msgListItem) 
})

function submitMsg() {
    const input = document.getElementById("msgInput")
    const message = input.value 
    input.value = ""

    socket.emit('msgInput', { message })
}