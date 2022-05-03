import admin from "firebase-admin";
import {normalizarMensajes, deNormalizarMensajes} from "../utils/normalizarMensajes.js";
import util from "util";
export default class ContainerFirebase {
    constructor(serviceAccount, nameCollection) {
        serviceAccount = JSON.parse(serviceAccount);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.db = admin.firestore();
        this.collection = this.db.collection(nameCollection)
    }

    async getAll(){
        try {
            const querySnapshot = await this.collection.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            //Genero el objeto con el array contenido
            let arrayMensajes = {id: 'mensajes', mensajes: response}
            //Normalizo y denormalizo
            const objNormalizado = normalizarMensajes(arrayMensajes);
            const objdeNormalizado = deNormalizarMensajes(objNormalizado);
            //Verifico normalizacion/desnormalizacion
            function print(objeto) {
                console.log(util.inspect(objeto,false,12,true))
            }
            //console.log("\n************Objeto Normalizado************")
            //print(objNormalizado)
            //console.log("\n************Objeto Desnormalizado************")
            //print(objdeNormalizado)
            //Prueba de optimizacion
            const longO = JSON.stringify(arrayMensajes).length
            const longN = JSON.stringify(objNormalizado).length
            const longD = JSON.stringify(objdeNormalizado).length

            console.log('\nLongitud objeto original: ', longO)
            console.log('\nLongitud objeto normalizado: ', longN)
            console.log('\nLongitud objeto desnormalizado: ', longD)

            const porcentaje = (longN*100)/longO
            console.log(`\nPorcentaje Optimizado: ${porcentaje.toFixed(2)} %`);

            return objNormalizado
        } catch (error) {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            const doc = this.colection.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            return response
        } catch (error) {
            console.error(error);
        }
    }

    async deleteById(id) {
        try {
            const doc = this.collection.doc(`${id}`);
            const item = doc.delete();
            console.log("Se ha eliminado exitosamente");
            return item
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAll() {
        try {
            const querySnapshot = await this.collection.get();
            const docs = querySnapshot.docs;
            const response = docs.map((doc) =>  this.deleteById(doc.id));
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async updated(id, objBody) {
        try {
            const doc = this.collection.doc(`${id}`)
            let item = await doc.update({
                ...objBody
            });
            console.log("Se actualizo el siguiente elemento", item);
            return item
        } catch (error) {
            console.error(error);
        }
    }

    async save(id, objBody) {
        try {
            const doc = this.collection.doc(`${id}`)
            await doc.create({
                timestamp: new Date().toLocaleString(), ...objBody
            })
            console.log("Datos insertados");
        } catch (error) {
            console.error(error);
        }
    }
}
