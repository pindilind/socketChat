let socket = io()
let name = "";
let room = "ChatRoom";
let typing = false;
let typingTimeout

/* window.onload = () => {
    name = prompt('Skriv ditt namn')

    socket.emit('join', { name })
} */

document.getElementById("toggleLeave").style.visibility = "hidden";

socket.on("joined", (incomingResult) => {

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + " joined the " + room + " ";
    msgListItem.style.color = "#ff5d8f"
    msgListItem.style.fontWeight = "bold"
    msgListItem.style.margin = "3px"

    let heartIcon = document.createElement("i")
    heartIcon.classList = "fas fa-heart"
    msgList.appendChild(heartIcon)
    msgListItem.appendChild(heartIcon)
    msgList.appendChild(msgListItem)


})

socket.on('msgInput', (incomingResult) => {

    if (incomingResult.type == "text") {
        const msgList = document.getElementById('messages')
        const msgListItem = document.createElement("li")
        msgListItem.innerHTML = '<b>' + incomingResult.name + ':</b> ' + incomingResult.message;
        msgListItem.style.margin = "10px"

        msgList.appendChild(msgListItem)

    } else if (incomingResult.type == "img") {

        const msgList = document.getElementById('messages')
        const msgListItem = document.createElement("li")
        msgListItem.innerHTML = '<b>' + incomingResult.name + ':</b> '

        let img = document.createElement('img')
        img.style.maxHeight = "250px"
        img.style.maxWidth = "250px"
        img.style.justifyContent = "center"
        img.style.alignItems = "center"
        img.style.display = "flex"
        img.style.objectFit = "cover";
        img.src = incomingResult.message //hämtar fetch

        msgList.appendChild(msgListItem)
        msgListItem.appendChild(img)


    }

})

//knapp för att skicka meddelande/bilder
async function submitMsg() {

    if (name === "") {
        const msgList = document.getElementById('joinMsg')
        const msgListItem = document.createElement("h1")
        msgListItem.innerHTML = '<b> Please JOIN the Chat... </b>';
        msgListItem.style.justifyContent = "center";
        msgListItem.style.color = "#ff5d8f";

        msgList.appendChild(msgListItem)
    }

    let dogResponse

    if (name === "") {
        socket.disconnect;
        document.getElementById('msgInput').value = ""
        return
    }

    if (msgInput.value == "/dog") {

        dogResponse = await dogApiResponse()
        document.getElementById("msgInput").value = "";

        socket.emit('msgInput', { name, type: "img", message: dogResponse.message });

    } else if (document.getElementById("msgInput").value == "") {
        alert("Ops! you missed to write a message...")
        return;

    } else {
        const input = document.getElementById('msgInput')
        const message = input.value
        input.value = ""

        socket.emit('msgInput', { name, type: "text", message });
    }



}

socket.on('typing', (incomingResult) => {

    const { typing, name } = incomingResult;

    if (!typing) {
        typeDiv.innerHTML = "";
        return;
    }

    typeDiv.innerHTML = '<em>' + incomingResult.name + " is typing..." + '</em>'
    typeDiv.style.color = "rgb(255, 255, 244)"
    typeDiv.style.marginBottom = "3px"
    typeDiv.style.marginLeft = "3px"


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
    }, 1500);
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

    console.log(" disconnected from Chatroom")

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerText = incomingResult.name + " has left the " + room + " "

    msgListItem.style.color = "#861438"
    msgListItem.style.fontWeight = "bold"
    msgListItem.style.margin = "3px"

    let brokenHeartIcon = document.createElement("i")
    brokenHeartIcon.classList = "fas fa-heart-broken"
    msgList.appendChild(brokenHeartIcon)
    msgListItem.appendChild(brokenHeartIcon)

    msgList.appendChild(msgListItem)


})

async function leaveChat() {
    console.log("leaving the chat...")
    if (confirm("Do you really want to leave the ChatRoom?"))
        console.log(name + " left the " + room)

    socket.emit("disconnected", { name, room })

    socket.disconnect()

    document.getElementById("toggleLeave").style.visibility = "hidden";
    document.getElementById("toggleJoin").style.visibility = "visible";
}

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

async function joinChat() {

    name = prompt('Enter your name, please');

    if (name.length >= 1) {
        socket.emit('joined', { name });
    } else {
        alert('You missed to enter your name...')
        name = prompt('Enter your name');
        return
    }

    //VILL TA BORT TEXTEN "PLEASE JOIN THE CHAT..."

    document.getElementById('joinMsg').style.visibility = "hidden";


    document.getElementById("toggleJoin").style.visibility = "hidden";
    document.getElementById("toggleLeave").style.visibility = "visible";

}

