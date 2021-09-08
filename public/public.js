let socket = io()
let name = ""

window.onload = () => {
    name = prompt('Skriv ditt namn')
}


//hämtar namn och message från server
socket.on('msgInput', (incomingResult) => {
    console.log(incomingResult)

  /*   const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name+ ": " + incomingResult.message
    msgList.appendChild(msgListItem)  */
})

//knapp för att hämta input och tömma den vid knapptryck
function submitMsg() {
    const input = document.getElementById("msgInput")
    const message = input.value 
    input.value = ""

    socket.emit('msgInput', { name, message })
}