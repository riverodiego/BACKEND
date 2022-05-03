import {normalize, denormalize, schema} from "normalizr";

//Define esquema de autor
const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'id_email'});

//Define esquema de mensaje
const schemaMensaje = new schema.Entity('post', {author: schemaAuthor}, {idAttribute: 'id'});

//Define esquema de mensaje
const schemaMensajes = new schema.Entity('posts', {mensajes: [schemaMensaje]}, {idAttribute: 'id'});

//Normalizo los mensajes
export function normalizarMensajes(dataObj) {
    const normalizadorMensajes = normalize(dataObj, schemaMensajes);
    return normalizadorMensajes
}

export function deNormalizarMensajes(dataObjNormalizado) {
    const deNormalizarMensajes = denormalize(dataObjNormalizado.result, schemaMensajes, dataObjNormalizado.entities);
    return deNormalizarMensajes
}
