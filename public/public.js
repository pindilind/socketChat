let socket = io()
let name = ""

window.onload = () => {
    name = prompt('Skriv ditt namn')
    
    socket.emit('join', { name })
}

socket.on("joined", (incomingResult) => {
    console.log(incomingResult.name + " joined the chat")

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + " joined the chat"
    msgList.appendChild(msgListItem)
})

socket.on('msgInput', (incomingResult) => {
    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name+ ": " + incomingResult.message
    msgList.appendChild(msgListItem)
})


socket.emit("typing", { name });

socket.on('isTyping', () => {
    console.log(name + " skriver")

})

socket.emit('leave', { name });

socket.on('leftchat', () => {
    console.log(name + " har lämnat")

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = name + " has left the chat"
    msgList.appendChild(msgListItem)
})


function submitMsg() {
    const input = document.getElementById("msgInput")
    const message = input.value
    input.value = ""

    socket.emit('msgInput', { name, message })
}

