const express = require('express')
const server = express()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const port = 3000

server.use(express.static('public')) //servar ut publica filer

io.on('connection', (socket) => {
    
    socket.on('msgInput', (incomingResult) => {
        //console.log(incomingResult)
        io.emit('msgInput', incomingResult)
    })
}) 

 /* server.get('/', (req, res) => {
  res.send('Hello World!')
}) */

/* server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */

http.listen(port, () => console.log("Tjohooo! Det fungerade :) "))