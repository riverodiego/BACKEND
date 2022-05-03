import express from "express";
import bodyParser from 'body-parser';
import ProductDAOFirebase from "./src/DAOs/productDAOFirebase.js";

const app = express();

const productDAO = new ProductDAOFirebase();

// ----------------- Middlewares ------------------

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------- Rutas ------------------
app.get('/', (req, res)=>{
    res.status(200).json({msg: 'Ruta / accedida'})
})

app.get('/api/productos/', async (req, res)=>{
    res.status(200).json(await productDAO.listAll())
})

app.get('/api/productos/:id', async (req, res)=>{
    res.status(200).json(await productDAO.getById(req.params.id))
})

app.delete('/api/productos/:id', async (req, res)=>{
    res.status(200).json(await productDAO.deleteById(req.params.id))
})

app.delete('/api/productos/', async (req, res)=>{
    res.status(200).json(await productDAO.deleteAll())
})

app.put('/api/productos/:id', async (req, res)=>{
    res.status(200).json(await productDAO.updated(req.params.id, req.body))
})

app.post('/api/productos/', async (req, res)=>{
    res.status(200).json(await productDAO.save(req.body))
})

const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', error => console.log(`Error en servidor: ${error}`))
