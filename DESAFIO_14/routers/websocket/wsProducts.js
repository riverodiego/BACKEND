import apiProducts from "../../src/API/apiProducts.js";

export default async function configSocket(socket, sockets) {

  socket.emit('listProducts', await apiProducts.getAll());

  socket.on('newProduct', async (product)=>{
    await apiProducts.save(product);
    sockets.emit('listProducts', await apiProducts.getAll());
  });

  socket.on('deleteProducts', async ()=>{
    await apiProducts.deleteAll();
    sockets.emit('listProducts', await apiProducts.getAll());
  });

}
