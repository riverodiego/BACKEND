const socket = io.connect();

function enviarProducto() {
    const nombre = document.querySelector('#nombre');
    const precio = document.querySelector('#precio');
    const foto_url = document.querySelector('#foto_url');
    socket.emit('productoNuevo', {nombre: nombre.value, precio: precio.value, foto_url: foto_url.value});
    return false;
}

function makeHtmlTable(productos) {
    return fetch("../plantillas/lista.hbs")
      .then((res) => res.text())
      .then((plantilla) => {
        const template = Handlebars.compile(plantilla);
        const html = template({ productos });
        console.log("productos",productos);
        return html
      });
  }
  
  socket.on("productosLista", productos => {
      makeHtmlTable(productos).then(
        resultado => { document.getElementById('tabla').innerHTML = resultado 
      });
  })

  /* ---------------------- Mensajeria ----------------------*/
function enviarMensaje() {
    const email = document.querySelector("#email");
    const mensaje = document.querySelector("#mensaje");
  
    const date = new Date();
    const dateStr =
      ("00" + date.getDate()).slice(-2)  +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2)+
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
  
    socket.emit("mensajeNuevo", { email: email.value, texto: mensaje.value, fecha: dateStr});
    return false;
  }

  function eliminarMensajes() {
    socket.emit("mensajesEliminar");
    return false;
  }

  function eliminarProductos() {
    socket.emit("productosEliminar");
    return false;
  }
  
  socket.on("mensajes", (mensajes) => {
    let constMensajeHtml = "";
  
    if (mensajes) {
        mensajes.forEach((mensaje) => {
          constMensajeHtml += `
            <div style="background-color: rgb(204, 230, 255); padding: 5px">  
            <span style="color: blue; font-weight: bold;">
                ${mensaje.email} </span>
              <span style="color:brown;"> [${mensaje.fecha}]: &nbsp;</span>
              <span style="color:green; font-style:italic;"> ${mensaje.texto}</span>
              </div> <hr/>`;
        });
        document.getElementById("mensajeria").innerHTML = constMensajeHtml;
      }else{
        document.getElementById("mensajeria").innerHTML = `<div class="alert alert-info text-center" role="alert">No Hay Conversaciones...</div>`;
      }
  })
