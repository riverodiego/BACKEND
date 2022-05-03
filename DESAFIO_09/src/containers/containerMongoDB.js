import mongoose from 'mongoose';
import config from "../utils/config.js";

const URL = config.mongodb.url;

await mongoose.connect(URL);

class ContainerMongoDB {
    constructor(nameCollection, eskema) {
        this.collection = mongoose.model(nameCollection, eskema)
    }

    async listAll(){
        try {
            const docs = await this.collection.find({})
            return docs;
        } catch (error) {
            console.error(error);
            return {
                code: '001',
                msg: 'Error al consumir ListarAll()'
            }
        }
    }

    async getById(id) {
        try {
            const docById = await this.collection.find({_id: id});
            return docById;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteById(id) {
        try {
            const docbyId = await this.collection.deleteOne({_id: id});
            return docbyId;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAll() {
        try {
            const docs = await this.collection.deleteMany({});
            return docs;
        } catch (error) {
            console.error(error);
        }
    }
    async updated(id, objBody) {
        try {
            console.log(id);
            console.log(body);
            const doc = await this.collection.updateOne({_id: id}, {$set: objBody});
            return doc;
        } catch (error) {
            console.error(error);
        }
    }

    async save(objBody) {
        try {
            console.log(objBody);
            const doc = await this.collection({timestamp: new Date(), ...objBody}).save();
            return doc;
        } catch (error) {
            console.error(error);
        }
    }
}

export default ContainerMongoDB;
