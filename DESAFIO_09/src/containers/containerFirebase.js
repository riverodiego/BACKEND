import config from "../utils/config.js";
import admin from 'firebase-admin';

const serviceAccount = config.firebase.objCert;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
class ContainerFirebase {
    constructor(nameCollection) {
        this.db = admin.firestore();
        this.collection = this.db.collection(nameCollection)
    }

    async listAll(){
        try {
            const querySnapshot = await this.collection.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return response
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

    async save(objBody) {
        try {
            const doc = this.collection.doc()
            await doc.create({
                timestamp: new Date(), ...objBody
            })
            console.log("Datos insertados");
        } catch (error) {
            console.error(error);
        }
    }
}

export default ContainerFirebase;

