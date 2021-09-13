let socket = io()
let name = "";
let room = "ChatRoom";


window.onload = () => {
    name = prompt('Skriv ditt namn')

    socket.emit('join', { name })
}

socket.on("joined", (incomingResult) => {
    console.log(incomingResult.name + " joined the " + room);

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + " joined the " + room;
    msgList.appendChild(msgListItem)
})

socket.on('msgInput', (incomingResult) => {
    console.log(incomingResult.name + ': ' + incomingResult.message)
    document.getElementById('typeDiv').innerHTML = ""
    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + ": " + incomingResult.message;
    msgList.appendChild(msgListItem)
})

function submitMsg() {

    if (document.getElementById("msgInput").value == "") {
        alert("Ops! du glömde skriva något...")
        return
    } else {
        const input = document.getElementById('msgInput')
        const message = input.value
        input.value = ""
    
        socket.emit('msgInput', { name, message })}

}

socket.on('typing', (incomingResult) => {
    typeDiv.innerHTML = '<em>' + incomingResult.name + " is typing..." + '</em>'
    
}) 


socket.emit('leave', { name });

let msgInput = document.getElementById('msgInput')

//keypress funktion för att hämta värde ur input
msgInput.addEventListener('keyup', () => {

    socket.emit('typing', { name } ) 

})


socket.on("disconnect", () => {

    console.log(name + " har lämnat " + room)
    
    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = name + " har lämnat " + room
    msgList.appendChild(msgListItem) 

})





