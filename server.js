var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

/**
 * serve app static files 
 */
app.use(express.static('./'));

/**
 * The lovely socket instance
 */
io.on('connection', (socket) => {

    socket.on('join', (roomName) => {
        if(roomExist(roomName)){
            socket.join(roomName);
            console.log("someone joined room : "+ roomName);
        }else{
            socket.emit("room-not-found",roomName);
        }
    });

    socket.on('create',(roomName) => {
        socket.join(roomName);
        console.log("room : " + roomName+" created");
    });

    socket.on('message', (data) => {
        console.log(data);
        io.sockets.in(data.room).emit("message",data.message);
    });
});

roomExist = (roomName) => {
    const avalaibleRooms = Object.keys(io.sockets.adapter.rooms);
    return true ? avalaibleRooms.includes(roomName) : false;
}

http.listen(3000);