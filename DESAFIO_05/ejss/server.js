/*--------------Modulos--------------*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

/*---------Instancia express---------*/
const app = express();
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
/*------------Middlewares------------*/
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

/*-----------Config Motor------------*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*---------------Rutas---------------*/

app.post('/productos', (req, res)=>{
    let producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto_url: req.body.foto_url
    }
    productos.push(producto);
    res.redirect('/')
});

app.get('/productos', (req, res)=>{
    res.render('./layouts', {productos})
});

app.get('/borrar', (req, res)=>{
    productos = [];
    res.redirect('/productos')
});

/*--------------Servidor-------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`))

