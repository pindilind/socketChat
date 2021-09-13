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

    /* if (incomingResult.message === "/dog") {
        dogApiResponse()
    } */
    console.log(incomingResult.name + ': ' + incomingResult.message)
    document.getElementById('typeDiv').innerHTML = ""
    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + ": " + incomingResult.message;
    msgList.appendChild(msgListItem)
})

async function submitMsg() {

    if(msgInput.value == "/dog") {
        dogApiResponse()
        document.getElementById("msgInput").value = "";
        
    }else if(document.getElementById("msgInput").value == "") {
        alert("Ops! du glömde skriva något...")
        return;

    } else {
        const input = document.getElementById('msgInput')
        const message = input.value
        input.value = ""

        socket.emit('msgInput', { name, message });
    } 
}

  /*   if(incomingResult.message === "/dog") {
        dogApiResponse()
    } */

socket.on('typing', (incomingResult) => {

    const { typing, name } = incomingResult;

    if (!typing) {
        typeDiv.innerHTML = "";
        return;
    }
    typeDiv.innerHTML = '<em>' + incomingResult.name + " is typing..." + '</em>'

})


socket.emit('leave', { name });

let msgInput = document.getElementById('msgInput')

//keypress funktion för att hämta värde ur input
msgInput.addEventListener('keyup', () => {

    socket.emit("typing", {
        typing: msgInput.value.length > 0,
        name,
    });

    /* socket.emit('typing', { name } ) */

})


socket.on("disconnect", () => {

    console.log(name + " har lämnat " + room)

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = name + " har lämnat " + room
    msgList.appendChild(msgListItem)

})



async function dogApiResponse() { //hämtar api med en knapp
    try {
        let response = await fetch("https://dog.ceo/api/breeds/image/random")
        let body = await response.json()
        console.log(body)

    } catch (err) {
        console.log(err)
    }

}

/* async function getDogApi() {
    dogApiResponse()
    if(incomingResult.message === "/dog") {
        const images = await dogApiResponse();
         socket.emit('msgInput', images)
    }

} */
