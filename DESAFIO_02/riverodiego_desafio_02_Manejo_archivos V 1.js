const fs = require('fs');

const objAgregar = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};

const ruta = './archivos/productos.txt';

class Contenedor {

    constructor (ruta) {
        this.ruta = ruta;
    }
    //console.log('this.ruta ', this.ruta);

    deleteAll () {
        (async function deleteContenido(ruta) {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                contenido ? fs.promises.writeFile(ruta, '') : null;
            } catch (error) {
                console.error(error);
            }
        })(this.ruta);
        return "deleteAll finalizado...";
    }

    getAll () {
        (async function getAllContenido(ruta) {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                let resultado = [];
                resultado = contenido ? JSON.parse(contenido) : null;
                console.log(resultado);
            } catch (error) {
                console.error(error);
            }
        })(this.ruta);
        return "getAll finalizado...";
    }

    save(objAgregar) {
        (async function setContenido(objAgregar, ruta) {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                let resultado = [];
                let indice = 0;
                if (contenido) {
                    resultado = JSON.parse(contenido);
                    indice = resultado.length + 1;
                    resultado = [...resultado, {...objAgregar, id: indice}]
                }else{
                    resultado = [{...objAgregar, id: 1}]
                }
                await fs.promises.writeFile(ruta, JSON.stringify(resultado, null, 2))
                console.log("Objeto agregado. Indice Asignado: ", indice);
            } catch (error) {
                console.error(error);
                } 
        })(objAgregar, this.ruta);
        return "Save finalizado...";
    };
    getById(id) {
        (async function getByIdContenido(id, ruta) {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                contenido = JSON.parse(contenido);
                resultado = contenido.find(elem => elem.id === id);
                resultado ? console.log("Objeto encontrado: ", resultado) : console.error(null)
            } catch (error) {
                console.error(error);
            };
        })(id, this.ruta);
        return "getById Finalizado..."
    };
    deleteById(id) {
        (async function deleteByIdContenido(id, ruta) {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                contenido = JSON.parse(contenido);
                resultado = contenido.find(elem => elem.id === id);
                if (resultado) {
                    resultado = contenido.map(elem => elem.id !== id);
                    await fs.promises.writeFile(ruta, JSON.stringify(resultado, null, 2));
                    console.log("Elemento eliminado Id:", id)
                } else { 
                    console.error("No existe el elemento a eliminar")
                };
            } catch (error) {
                console.error(error);
            };
        })(id, this.ruta);
        return "deleteById Finalizado..."
    };
};

let resultado = new Contenedor(ruta);
console.log(resultado.save(objAgregar));
setTimeout(() => console.log(resultado.deleteById(8)), 3000)
//console.log(resultado.deleteAll())
//console.log(resultado.getAll())
//console.log(resultado.save(objAgregar));
//console.log(resultado.getById(64));
