import { feathers } from '@feathersjs/feathers';
import {
    koa,
    rest,
    bodyParser,
    errorHandler,
    serveStatic,
} from '@feathersjs/koa';
import socketio from '@feathersjs/socketio';
import { PrismaClient } from '@prisma/client';
import { EventController } from './controllers/event.controller';

// This tells TypeScript what services we are registering
type ServiceTypes = {
    events: EventController;
};

// Creates an KoaJS compatible Feathers application
const app = koa<ServiceTypes>(feathers());

// Use the current folder for static file hosting
app.use(serveStatic('.'));
// Register the error handle
app.use(errorHandler());
// Parse JSON request bodies
app.use(bodyParser());

// Register REST service handler
app.configure(rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register our messages service

// Register the message service on the Feathers application
app.use('events', new EventController());

// Add any new real-time connection to the `everybody` channel
app.on('connection', (connection) => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish((_data) => app.channel('everybody'));

// Log every time a new message has been created
app.service('events').on('created', (event: Event) => {
    console.log('A new event has been created', event);
});

// Start the server
app.listen(3030).then(() =>
    console.log('Feathers server listening on localhost:3030')
);

// // A function that creates messages and then logs
// // all existing messages on the service
// const main = async () => {
//     // Create a new message on our message service
//     await app.service('messages').create({
//         text: 'Hello Feathers',
//     });

//     // And another one
//     await app.service('messages').create({
//         text: 'Hello again',
//     });

//     // Find all existing messages
//     const messages = await app.service('messages').find();

//     console.log('All messages', messages);
// };

// main();
