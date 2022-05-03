const fs = require('fs');

const objAgregar = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};

class Contenedor {

    constructor (ruta) {
        this.ruta = ruta;
    }

    deleteAll() {
        try {
            let contenido = fs.readFileSync(this.ruta, 'utf-8');
            contenido ? fs.writeFileSync(this.ruta, '') : null;
            return "Contenido eliminado"
        } catch (error) {
            console.error(error);
        }
    };

    getAll() {
        try {
            let contenido = fs.readFileSync(this.ruta, 'utf-8');
            return contenido ? JSON.parse(contenido) : null;
        } catch (error) {
            console.error(error);
        }
    };

    save(objAgregar) {
        try {
            let contenido = this.getAll()
            let indice = 1;
            if (contenido) {
                indice = contenido[contenido.length-1].id + 1
                contenido = [...contenido, {...objAgregar, id: indice}]
            }else{
                contenido = [{...objAgregar, id: 1}]
            }
            fs.writeFileSync(this.ruta, JSON.stringify(contenido, null, 2))
            return console.log("Objeto agregado. Indice Asignado: ", indice);
        } catch (error) {
            console.error(error);
        } 
    };
    
    getById(id) {
        try {
            let contenido = this.getAll()
            let resultado = contenido.find(elem => elem.id === id);
            return resultado ? resultado : null
        } catch (error) {
            console.error(error);
        };
    };

    deleteById(id) {
        try {
            let contenido = this.getAll()
            let resultado = contenido.find(elem => elem.id === id);
            if (resultado) {
                resultado = contenido.filter(elem => elem.id !== id);
                fs.writeFileSync(this.ruta, JSON.stringify(resultado, null, 2));
                console.log("Elemento eliminado Id:", id)
            } else { 
                console.error("No existe el elemento a eliminar")
            };
            return "deleteById finalizado..."
        } catch (error) {
            console.error(error);
        };
    };
};

module.exports = Contenedor;
