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
        io.to(incomingResult).emit("joined", { name: incomingResult.name })
    })


    socket.on('msgInput', (incomingResult) => {

        io.emit('msgInput', incomingResult)
    })

    
    socket.on("typing", (incomingResult) => {
        console.log('Nu är jag i typing')
        socket.broadcast.emit('typing', incomingResult)
    })

    socket.on("disconnect", () => {
        console.log("has left the chat")
        //io.emit('test' )
    })
})

/* server.get('/', (req, res) => {
 res.send('Hello World!')
}) */

/* server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */

http.listen(port, () => console.log("Tjohooo! Det fungerade :) "))
