const express = require('express')
const server = express()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const port = 3000

server.use(express.static('public')) //servar ut publica filer

io.on('connection', (socket) => {

    console.log("new chat user")

    socket.on("join", (incomingResult) => {
        console.log(incomingResult);

        socket.join(incomingResult)
        //io.to(incomingResult).emit("joined", { name: incomingResult.name })
        io.emit('joined', {name: incomingResult.name})
    })


    socket.on('msgInput', (incomingResult) => {

        console.log('hej')
        io.emit('msgInput', incomingResult)
    })

    
    socket.on("typing", (incomingResult) => {
        
        console.log('Nu är jag i typing')
        io.emit('isTyping', incomingResult)
    })

    socket.on('leave', () => {
      console.log('... has left')
     
      io.emit('leftchat');
    })
  })


http.listen(port, () => console.log("Tjohooo! Det fungerade :) "))
