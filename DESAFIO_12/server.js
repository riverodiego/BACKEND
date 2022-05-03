/* ---------------------- Modulos ----------------------*/
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import mongo from "connect-mongo";
import config from "./config.js";
import path from "path";

import wsProducts from "./routers/websocket/wsProducts.js";
import wsMessages from "./routers/websocket/wsMessages.js";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import passport from "passport";
import homeRouter from "./routers/web/homeRouter.js";
import authRouter from "./routers/web/authRouter.js";
import fakerRouter from "./routers/fakerJS/fakerRouter.js";

/* --- INSTANCIA EXPRESS --- */

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* --- MIDDLEWARES --- */

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

// ------ Motor de Plantilla HBS ------ //
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    //defaultLayout: 'index',
    //layoutsDir: path.join(__dirname, 'views/layouts'),
    layoutsPartials: path.join(__dirname, 'views/partials'),
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// ------ Mongo ------ //

const MongoStore = mongo.create({
    mongoUrl: config.mongo.url,
    ttl: 60,
});
app.use(
    session({
        store: MongoStore,
        secret: "123456789!#$%&/",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
    })
);

/* WEBSOCKET */

io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    wsProducts(socket, io.sockets);
    wsMessages(socket, io.sockets);
});

/*----------- passport -----------*/
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
//-----Ruta a los productos de Faker.js
app.use("/", fakerRouter);

//-----Ruta a las vistas del servidor
app.use("/", authRouter);
app.use("/", homeRouter);


/* SERVIDOR */
const server = httpServer.listen(config.PORT, ()=>{
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`);
})
server.on('error', (error) => console.error(`Error en el servidor ${error}`));

/*
    npm init -y 
    npm install express socket.io
        "dev": "nodemon server.js"
*/