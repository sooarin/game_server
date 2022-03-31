const app = require('express')();
const httpServer = require('http').createServer(app);
const socketIO = require('socket.io')(httpServer);
console.log('Server Start : port 4000');

socketIO.on('connection', function(socket) {
    console.log(`Player Connected : ${socket.id}`);

    socket.on('PlayerMove', function (args) {
        socket.broadcast.emit('OtherPlayerMove', socket.id, args);
    });

    socket.broadcast.emit('OtherPlayerConnect', socket.id);

    socketIO.on('disconnect', function() {
        console.log('A Player disconnected');
        socket.broadcast.emit('OtherPlayerDisconnected', socket.id);
    });
});
httpServer.listen(4000);