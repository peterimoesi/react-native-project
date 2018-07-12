export const socket = (io) => {
    io.on('connection', function(socket) {
        socket.on(`join`, (id) => {
            socket.join(id);
            socket.room = id;
            console.log('User joined', socket.room);
        });

        socket.on('user-online', (id) => {
            socket.join(id);
            console.log('user online', id);
        })

        // listen for new messages
        socket.on('new message', (id) => {
            // socket.broadcast.emit('refresh all messages', id);
            io.sockets.in(id).emit('refresh messages', id); // set to clients within this chat id
        });

        socket.on('notify user', (id) => {
            socket.to(id.room).emit('refresh all messages', id)
            // io.sockets.in(id).emit('refresh all messages', id);
        });

        socket.on('leave conversation', (id) => {
            socket.leave(id);
        })

        socket.on('disconnect', () => {
            // console.log('user disconnected');
        });

    });
    // io.on('error', function(err) {
    //     console.log(err)
    // });
}