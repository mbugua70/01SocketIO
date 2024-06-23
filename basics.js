const express = require('express');
const app = express();
const { Server } = require('socket.io');



const PORT = process.env.PORT || 4040


const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

const io = new Server(server);


// middleware

app.use(express.static('./public'));


// listening to the connection event
io.on("connection", (socket) => {
    console.log("User connected");
    // each socket also fires a special disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})
