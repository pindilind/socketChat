# Chat-app med socket.io
### Inlämningsuppgift - Socket chat med Web API integration

Grupp 4: Linda Gustafsson, Susan Isaksson | betygsnivå: G 

GitHub link: https://github.com/pindilind/socketChat.git

#### Krav för godkänt: 

    1. En fungerade chatt med gränssnitt där man kan skriva ett kommando ”/” för att utföra en operation som integrerar med 3-part. - OK

    Ansvarig/ansvariga: Linda 

    2. När någon skriver skall det synas för andra. - OK

    Ansvarig/ansvariga: Linda/Susan

    3. Då en person lämnar chatten skall detta tydligt visas för alla andra i chatten. - OK

    Ansvarig/ansvariga: Susan 

    4. Projektmappen innehåller en README.md fil  - OK

    Ansvarig/ansvariga: Susan/Linda

    5. Git & GitHub har använts - OK 

    6. Uppgiften lämnas in i tid! 

### Summary of the application

#### A chat room using socket.io, Node.js and Express

This application is a chat room with one "room". To join the chat room requires you to enter your name to join. In the chat room all participants can see who is joining, writing messages, sending url (images from an external API) and leaving. 
Enjoy a good chat with old and new friends!

## Installation 

#### This is a Node.js application. 
#### Before installing, download and install Node.js. 
#### You may need to create a package.json first, use command:
    npm init 
#### To install express, socket.io and nodemon, use npm install comand: 
    npm install express 
    npm install socket.io
    npm install –g nodemon 

#### Create a server file
    server.js

and enter following code:

    const express = require('express')
    const server = express()
    const http = require('http').createserver(server)
    const io = require('socket.io')(http)
    const port = 3000

    server.use(express.static('public))

    app.get('/', (req, res) => {
        res.send('<h1>Hello world</h1>)
    })

    http.listen(port, () => console.log('The server is working and listen to port ' + port))

Start the app in the terminal with 
    nodemon server.js 
    npm start
Now the server should be up and going in port 3000 in you localhost.
   

## Quick start 

    Check if node.js is installed:  node and the verson vill show in the terminal 

    Create and open a application/repostitory to use 

    In the terminal: npm init

    Install dependencies: npm install express, npm install socket.io, npm installa -g nodemon

    Start the server: nodemon server.js, npm start 

    Set the port to: 3000 (localhost:3000) 

#### version 01.0.0/2021-09-17/
Testing for push to github