import apiMessages from "../../src/API/apiMessages.js";

export default async function configSocket(socket, sockets) {
  socket.emit('messages', await apiMessages.getAll());
  /* Escuchar los nuevos mensajes*/
  socket.on('newMessage', async (data)=>{
      let extraer_id = deNormalizarMensajes(await apiMessages.getAll());
      extraer_id = extraer_id.mensajes;
      console.log("extraer_id", extraer_id.length);
      let id = extraer_id.length == 0 ? "0001" : ((parseInt(extraer_id[extraer_id.length - 1].id)+1).toString().padStart(4, "0"));
      await apiMessages.save(id, data);
      /* Se actualiza la vista*/
      sockets.emit('allMessages', await apiMessages.getAll());
  });
  socket.on('deleteMessages', async ()=>{
      await apiMessages.deleteAll();
      /* Se actualiza la vista*/
      sockets.emit('allMessages', await apiMessages.getAll());
  });}


