/*-------------Modulos-------------*/
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routerProductos = require('./rutas/productos.rutas')

/*-------------Instancia de variables-------------*/
const app = express();

/*-------------Middlewares-------------*/
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/productos', routerProductos);
routerProductos.use(express.json());
app.use(express.static('public'));

/*-------------Servidor-------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`))