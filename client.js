var socket = io();
var roomName = null;

$('#join-form').submit(function(e) {
    e.preventDefault();
    roomName = $('#room-name').val();
    socket.emit('join', roomName);
    return false;
});

$('#create-form').submit(function(e) {
    e.preventDefault();
    roomName = $('#new-room-name').val();
    socket.emit('create', roomName);
    return false;
});

$('#send-message-form').submit(function(e) {
    e.preventDefault();
    socket.emit('message',{room: roomName, message : $('#message').val()});
    return false;
});


socket.on('room-not-found', (roomName) => {
    alert("Man ! I can't find this room ["+roomName+"]");
});

socket.on('message', (message) => {
    $('#messages').append($('<li>').text(message));
});