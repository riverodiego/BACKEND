/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const Contenedor = require('./contenedor');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

/* ---------------------- Instancia de express ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json())

/* ---------------------- Motor de plantillas ---------------------- */
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

/* ---------------------- WebSocket ---------------------- */
let productos = [
    {
        nombre: 'Tijera',
        precio: '125.33',
        foto_url: 'https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/opened-scissor-256.png'
      },
      {
        nombre: 'Lapiz',
        precio: '20.99',
        foto_url: 'https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/pencil-128.png'
      }
];

const ruta = './archivos/mensajes.txt';
let mensajes = new Contenedor(ruta);

io.on('connection', socket => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    /* Enviar historico de productos y mensajes*/
    socket.emit('productosLista', productos);
    socket.emit('mensajes', mensajes.getAll());
    /* Escuchar los nuevos productos y mensajes*/
    socket.on('productoNuevo', data=>{
        productos.push(data);
        /* Se actualiza la vista*/
        io.sockets.emit('productosLista', productos);
    });
    socket.on('mensajeNuevo', data=>{
        mensajes.save(data);
        /* Se actualiza la vista*/
        io.sockets.emit('mensajes', mensajes.getAll());
    });
    socket.on('productosEliminar', ()=>{
        productos=[];
        /* Se actualiza la vista*/
        io.sockets.emit('productosLista', productos);
    });
    socket.on('mensajesEliminar', ()=>{
        mensajes.deleteAll();
        /* Se actualiza la vista*/
        io.sockets.emit('mensajes', mensajes.getAll());
    });
});

/* ---------------------- Servidor ----------------------*/
const PORT = 3000;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});

/*
    npm init -y 
    npm install express socket.io
        "dev": "nodemon server.js"

*/