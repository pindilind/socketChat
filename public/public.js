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

    const msgList = document.getElementById('messages')
    const msgListItem = document.createElement("li")
    msgListItem.innerHTML = '<b>' + incomingResult.name + '</b>' +  ": " + incomingResult.message;
    msgListItem.style.margin = "10px"

    msgList.appendChild(msgListItem)
    

})

//knapp för att skicka meddelande/bilder
async function submitMsg() {

    let dogResponse

    if (msgInput.value == "/dog") {
        
        dogResponse = await dogApiResponse()
        document.getElementById("msgInput").value = "";
       /*  socket.img() */
        
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
    typeDiv.innerHTML = '<em>' + incomingResult.name + " is typing..." + '</em>'
    
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
    msgListItem.innerText = incomingResult.name + " has left the " + room + " "

    msgListItem.style.color = "#861438"
    msgListItem.style.fontWeight = "bold"

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

}






//hämtar api med en knapp
async function dogApiResponse() {
    try {
        let response = await fetch("https://dog.ceo/api/breeds/image/random")
        let body = await response.json()
        console.log(body)

        let img = document.createElement('img')
        img.style.maxHeight = "250px"
        img.style.maxWidth = "250px"
        img.style.justifyContent = "center"
        img.style.alignItems = "center"
        img.style.display = "flex"
        img.style.objectFit = "cover";
        img.src = body.message//hämtar fetch

        document.getElementById('messages').appendChild(img)
        return body;

    } catch (err) {
        console.log(err)
    }

}

