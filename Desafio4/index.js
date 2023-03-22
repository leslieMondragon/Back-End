const express = require ('express');
const handlebars = require('express-handlebars');
const viewRouter = require('./src/routes/viewsRouter');
const {Server} = require('socket.io');
const {sockets} = require('./sockets');

const port = 8080;

//Imports Routes
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');


const app = express();
const httpServer = app.listen(port,()=>console.log(`Listening in port ${port}`));

//Socket
const socketServer = new Server(httpServer);
sockets(socketServer);


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + '/src/public'))


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);



