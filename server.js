const express = require('express');
const http = require('http');
const models = require('./models/models');

// start the connection.

const port = process.env.PORT;


const io = require('socket.io')(port, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


//middleware to store all messages being send that are not empty.
io.use((socket, next) => {

    socket.on('send_message', (data) => {
         
        models.logItAll(data);
        console.log('msg file going thru..')
    })
    next();

})


//on connection create new socket.
io.on('connection', socket => {
    console.log(`User Connected: ${socket.id}`);



    // listens on send from frontend and excutes logic
    socket.on('send_message', async (data) => {
        if (data.message === '') {
            return console.log('ERROR empty message!');
        }
        else {
            console.log(data);
            await models.addMessage(data);
            socket.to(data.area).emit('rec_message', (data))
        }
    })


    // listens on send from frontend and excutes logic
    socket.on('send_room', async (data) => {
        console.log(data);
        await models.addRoom(data);
        socket.broadcast.emit('send_room', (data))
    })


    // listens on send from frontend and excutes logic
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`user with id:${socket.id} joined room: ${data}`);
        socket.emit('joined_room', (data))
    })


    // listens on send from frontend and excutes logic
    socket.on('delete_room', (data) => {
        console.log(`user with id:${socket.id} wants to delete room: ${data}`);
        models.deleteChatt(data);
        socket.emit('deleted_room', (data))
        socket.broadcast.emit('deleted_room', (data))
        models.delAllMsg(data);
        io.socketsLeave(data);
        console.log(`${data} was deleted, all users kicked from room.`)
    })


    // listens on send from frontend and excutes logic
    socket.on('all_room', async () => {
        console.log(`loading all rooms....`);
        const allRooms = await models.allChatts();
        const allNames = await models.allNames();
        socket.emit('gotall_room', (allRooms))
        socket.emit('gotall_names', (allNames))
    })







})

