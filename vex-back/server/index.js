import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { socket } from './utils/io';
import {
    Vexroutes,
    UserRoutes,
    ServiceRoutes,
    ConversationRoutes
} from './modules';

const app = express();

// Database
    dbConfig();

// middlewares

    middlewaresConfig(app);

// Routing

    app.use('/api', [Vexroutes, UserRoutes, ServiceRoutes, ConversationRoutes]);

const PORT = process.env.port || 3000;

const server = app.listen(PORT, err => {
    if (err) {
        console.log('error');
    } else {
        console.log('app is running...');
    }
})


// socket.io

const io = socketIo(server);
socket(io);
