# ANTECKNINGAR
#### Här kan man skriva anteckningar om arbetet för att lättare komma ihåg.
##### SERVER.JS
socket  = en klient
connection = meddelande och finns default

***io.on*** - skapas innan socket.io och när man är "inne" i io.on körs socket.io callback för varje användare.

***Socket.io Callback*** - all kommunikation som kommer från sockets, behöver vi hantera innuti socketCallbacken. Respresenterar i användare.

