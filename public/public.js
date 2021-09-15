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
    msgListItem.style.color = "green"
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
    let talkIcon = document.createElement("i")
    talkIcon.classList = 'fas fa-comment-dots'
    typeDiv.innerHTML = "talkIcon" + '<em>' + incomingResult.name + " is typing..." + '</em>'
    
})


//socket.emit('leave', { name });

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



socket.on("disconnected", (incomingResult) => {
    //rad 138 + 142 HAR PROBLEM ATT FÅ KONTAKT MED NAMNET
    console.log(" disconnected from Chatroom")

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + " har lämnat " + room
    msgListItem.style.color = "red"
    msgList.appendChild(msgListItem)

    //document.getElementById("msgDiv").value = ""

})

async function leaveChat() {
    console.log("leaving the chat...")
    if (confirm("Do you really want to leave the ChatRoom?"))
    console.log(name + " left the " + room)

    socket.emit("disconnected", { name, room })

    socket.disconnect()

    //.innertext SKRIVS INTE UT HOS ALLA...

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = name + " har lämnat " + room
    msgListItem.style.color = "red"
    msgList.appendChild(msgListItem)

    
}



//hämtar api med en knapp
async function dogApiResponse() {
    try {
        let response = await fetch("https://dog.ceo/api/breeds/image/random")
        let body = await response.json()
        console.log(body)
        return body;

    } catch (err) {
        console.log(err)
    }

}

