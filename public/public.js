let socket = io()
let name = "";
let room = "ChatRoom";
let typing = false;
let typingTimeout


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

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + ": " + incomingResult.message;
    msgList.appendChild(msgListItem)

})

//knapp för att skicka meddelande/bilder
async function submitMsg() {

    let dogResponse

    if (msgInput.value == "/dog") {

        dogResponse = await dogApiResponse()
        console.log(dogResponse)
        document.getElementById("msgInput").value = "";
        socket.emit('msgInput', { name, message: dogResponse.message });

    } else if (document.getElementById("msgInput").value == "") {
        alert("Ops! du glömde skriva något...")
        return;

    } else {
        const input = document.getElementById('msgInput')
        const message = input.value
        input.value = ""

        socket.emit('msgInput', { name, message });
    }
}



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

    if (!typing) {
        typing = true

        socket.emit("typing", {
            typing: true,
            name,
        });

    }
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(function () {
        typing = false

        socket.emit("typing", {
            typing: false,
            name
        })
    }, 1000);


})

async function hideShow() {

    const msgInput = document.getElementById('msgInput').value
    document.getElementById('hideAndShow')

    if (msgInput == "/") {
        document.getElementById('hideAndShow').className = "b"

    } else if (msgInput == "/d") {
        document.getElementById('hideAndShow').className = "b"

    } else if (msgInput == "/do") {
        document.getElementById('hideAndShow').className = "b"

    } else if (msgInput == "/dog") {
        document.getElementById('hideAndShow').className = "b"

    } else {
        document.getElementById('hideAndShow').className = "a"

    }
}

async function selectCommand() {
    document.getElementById('msgInput').value = "/dog"
    document.getElementById('hideAndShow').className = "a"
}



socket.on("disconnect", () => {

    console.log(name + " har lämnat " + room)

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = name + " har lämnat " + room
    msgList.appendChild(msgListItem)

})


//hämtar api med en knapp
async function dogApiResponse() {
    try {
        let response = await fetch("https://dog.ceo/api/breeds/image/random")
        let body = await response.json()
        return body;

    } catch (err) {
        console.log(err)
    }

}

