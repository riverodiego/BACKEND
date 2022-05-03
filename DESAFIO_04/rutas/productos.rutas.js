const express = require('express');
const routerProductos = express.Router();

let productos = []
let indice = 1;

routerProductos.get('/', (req, res) => {
    res.status(200).json(productos);
})

routerProductos.get('/:id', (req, res) => {
    let parId = parseInt(req.params.id);
    let resultado = productos.find(elem => elem.id === parId)
    resultado ? res.status(200).json({msg: 'Producto encontrado', data: resultado})
                :
                res.status(500).json({error: `producto no encontrado`})
})

/*SE ENVIA EL BODY MANUAL DESDE POSTMAN */
routerProductos.put('/:id', (req, res) => {

    let parId = parseInt(req.params.id);
    let resultado = productos.find(elem => elem.id === parId);
    let index = productos.indexOf(resultado);

    let productosActualizar = {
        titulo: req.body.titulo,
        precio: req.body.precio,
        miniatura: req.body.miniatura
    };

    if (index == -1) {
        res.send({ code: 400, failed: "Producto no Encontrado" });
    } else {
        for (let key of Object.keys(productosActualizar)) {
            productosActualizar[key] && (productos[index][key] = productosActualizar[key])
        }
    res.send({ code: 200, mensaje: "Producto Actualizado", data: productos[index]});
    }
})

routerProductos.delete('/:id', (req, res) => {
    let parId = parseInt(req.params.id);
    let resultado = productos.find(elem => elem.id === parId);
    if (resultado) {
        productos = productos.filter(elem => elem.id !== parId);
        res.status(200).json({msg: 'Producto eliminado', data: resultado})
    } else {
        res.status(500).json({error: `producto no encontrado`})
    }
})

/*SE UTILIZA EL FORMULARIO CREADO EN EL INDEX.HTML PARA AGREGAR PRODUCTOS*/
routerProductos.post('/',(req, res) =>{
    if (productos.length > 0) {
        indice = productos[productos.length-1].id + 1
        productos = [...productos, {...req.body, id: indice}]
    }else{
        productos = [{...req.body, id: indice}]
    }
    res.status(200).json({msg: 'Producto Agregado', data: productos[productos.length-1]});
})

module.exports = routerProductos;