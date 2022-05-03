/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { optionsMariaDB } = require('./src/utils/optionsMariaDB');
//const { optionsSql3 } = require('./src/utils/optionsSql3');
const Container = require('./src/containers/Container.js');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const ProductsMock = require("./src/mocks/ProductsMocks.js");
const MensajeDAOFirebase = require("./src/DAOs/mensajeDAOFirebase.js")
const { deNormalizarMensajes } = require("./src/utils/normalizarMensajes.js");

/* ---------------------- Instancia de express ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const tablaProductos = "productos";
const tablaMensajes = "mensajes";
const productosApi = new Container(optionsMariaDB, tablaProductos);
const mockItems = new ProductsMock();
const mensajeDAO = new MensajeDAOFirebase(tablaMensajes)

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

/* ---------------------- Rutas ---------------------- */
app.get("/api/productos-test", (req, res) => {
    let productos = mockItems.random();
    res.render('lista', {productos})
});

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

(async () => {await productosApi.save(productos)})();

io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    /* Enviar historico de productos y mensajes*/
    socket.emit('productosLista', await productosApi.getAll());
    socket.emit('mensajes', await mensajeDAO.getAll());
    /* Escuchar los nuevos productos y mensajes*/
    socket.on('productoNuevo', async (data)=>{
        await productosApi.save(data);
        /* Se actualiza la vista*/
        io.sockets.emit('productosLista', await productosApi.getAll());
    });
    socket.on('mensajeNuevo', async (data)=>{
        let extraer_id = deNormalizarMensajes(await mensajeDAO.getAll());
        extraer_id = extraer_id.mensajes;
        console.log("extraer_id", extraer_id.length);
        let id = extraer_id.length == 0 ? "0001" : ((parseInt(extraer_id[extraer_id.length - 1].id)+1).toString().padStart(4, "0"));
        await mensajeDAO.save(id, data);
        /* Se actualiza la vista*/
        io.sockets.emit('mensajes', await mensajeDAO.getAll());
    });
    socket.on('productosEliminar', async ()=>{
        await productosApi.deleteAll();
        /* Se actualiza la vista*/
        io.sockets.emit('productosLista', await productosApi.getAll());
    });
    socket.on('mensajesEliminar', async ()=>{
        await mensajeDAO.deleteAll();
        /* Se actualiza la vista*/
        io.sockets.emit('mensajes', await mensajeDAO.getAll());
    });
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
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