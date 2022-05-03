//Define esquema de autor
const schemaAuthor = new normalizr.schema.Entity('author', {}, {idAttribute: 'id_email'});
//Define esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity('post', {author: schemaAuthor}, {idAttribute: 'id'});
//Define esquema de mensaje
const schemaMensajes = new normalizr.schema.Entity('posts', {mensajes: [schemaMensaje]}, {idAttribute: 'id'});

function deNormalizarMensajes(objNormalizado) {
    const objdeNormalizado = normalizr.denormalize(objNormalizado.result, schemaMensajes, objNormalizado.entities);
    const longN = JSON.stringify(objNormalizado).length
    const longD = JSON.stringify(objdeNormalizado).length
    const compresion = (longN*100)/longD
    console.log('\nLongitud objeto normalizado: ', longN)
    console.log('\nLongitud objeto desnormalizado: ', longD)
    console.log(`\nPorcentaje Optimizado: ${compresion.toFixed(2)} %`);

    return {
        objMsg: objdeNormalizado,
        porcentaje: compresion
    }
}

