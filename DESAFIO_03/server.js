const express = require('express');
const Contenedor = require('./contenedor');
const PORT = 8080;

const app = express();

const ruta = './archivos/productos.txt';

let objContenedor = new Contenedor(ruta);

let contenido = objContenedor.getAll();

app.get('/productos', (req,res) => {
    res.json(contenido)
});


app.get('/productoRandom', (req, res) => {
    function random(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    let aleatorio = parseInt(random(0, contenido.length - 1))
    res.json(contenido[aleatorio])
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`))