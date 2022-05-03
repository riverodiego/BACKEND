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

    deleteAll() {
        async function deleteContent() {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                contenido ? fs.promises.writeFile(ruta, '') : null;
                return "Contenido eliminado"
            } catch (error) {
                console.error(error);
            }
        };
        return deleteContent();
    }

    getAll() {
        async function getContent() {
            try {
                let contenido = await fs.promises.readFile(ruta, 'utf-8');
                return contenido ? JSON.parse(contenido) : null;
            } catch (error) {
                console.error(error);
            }
        };
        return getContent()
    }

    save(objAgregar) {
        async function addContent(objAgregar) {
            try {
                let contenido = await contenedor.getAll()
                let indice = 1;
                if (contenido) {
                    indice = contenido[contenido.length-1].id + 1
                    contenido = [...contenido, {...objAgregar, id: indice}]
                }else{
                    contenido = [{...objAgregar, id: 1}]
                }
                await fs.promises.writeFile(ruta, JSON.stringify(contenido, null, 2))
                return console.log("Objeto agregado. Indice Asignado: ", indice);
            } catch (error) {
                console.error(error);
                } 
        };
        return addContent(objAgregar);
    };
    getById(id) {
        async function getByIdContent(id) {
            try {
                let contenido = await contenedor.getAll()
                let resultado = contenido.find(elem => elem.id === id);
                return resultado ? resultado : null
            } catch (error) {
                console.error(error);
            };
        };
        return getByIdContent(id);
    };
    deleteById(id) {
        async function deleteByIdContent(id) {
            try {
                let contenido = await contenedor.getAll()
                let resultado = contenido.find(elem => elem.id === id);
                if (resultado) {
                    resultado = contenido.filter(elem => elem.id !== id);
                    await fs.promises.writeFile(ruta, JSON.stringify(resultado, null, 2));
                    console.log("Elemento eliminado Id:", id)
                } else { 
                    console.error("No existe el elemento a eliminar")
                };
                return "deleteById finalizado..."
            } catch (error) {
                console.error(error);
            };
        };
        return deleteByIdContent(id);
    };
};

//LLAMADOS DE PRUEBA

let contenedor = new Contenedor(ruta);

const ejecutar = () => {
    setTimeout(()=> contenedor.save(objAgregar), 100);
    setTimeout(()=> contenedor.save(objAgregar), 200);
    setTimeout(()=> contenedor.save(objAgregar), 300);
    setTimeout(()=> resp1 = contenedor.getAll(), 400);
    setTimeout(()=> console.log(resp1),600);
    setTimeout(()=> resp2 = contenedor.getById(555555555), 700);
    setTimeout(()=> console.log(resp2),800);
    setTimeout(()=> resp3 = contenedor.getById(2), 700);
    setTimeout(()=> console.log(resp3),800);
    setTimeout(()=> resp4 = contenedor.deleteById(52111111), 900);
    setTimeout(()=> console.log(resp4),1000);
    setTimeout(()=> resp5 = contenedor.deleteById(3), 1100);
    setTimeout(()=> console.log(resp5),1200);
    setTimeout(()=> resp6 = contenedor.deleteAll(), 1400);
    setTimeout(()=> console.log(resp6),1500);
}

ejecutar();
