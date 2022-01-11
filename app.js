const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);


app.use('/',express.static(path.join(__dirname,'public')));

const users = {};

io.on('connection', (socket) => {
    socket.on('send-user-data', (data) => {
        users[socket.id] = data.user
    })
    socket.on('send-msg', (data) => {
        io.emit('received-msg',{
            user: users[socket.id],
            msg: data.msg
        });
    });
});




const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`server running at port ${port}`);
})