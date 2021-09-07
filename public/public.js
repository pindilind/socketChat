let socket = io()
let name = ""

window.onload = () => {
    name = prompt('Skriv ditt namn')
}

socket.on('msgInput', (incomingResult) => {

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name+ ": " + incomingResult.message
    msgList.appendChild(msgListItem) 
})

function submitMsg() {
    const input = document.getElementById("msgInput")
    const message = input.value 
    input.value = ""

    socket.emit('msgInput', { name, message })
}