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
    const id_email = document.querySelector("#id_email");
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const edad = document.querySelector("#edad");
    const alias = document.querySelector("#alias");
    const avatar = document.querySelector("#avatar");
    const mensaje = document.querySelector("#text");
  
    //const dateStr = new Date().toLocaleString();
  
    socket.emit("mensajeNuevo", { 
      author: { 
          id_email: id_email.value,
          nombre: nombre.value,
          apellido: apellido.value,
          edad: edad.value,
          alias: alias.value,
          avatar: avatar.value
      },
      text: mensaje.value,
      });
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
    let deNormalizadoMsg = deNormalizarMensajes(mensajes);
    mensajes = deNormalizadoMsg.objMsg.mensajes;
    let porcentaje = deNormalizadoMsg.porcentaje.toFixed(2);
    //console.log(mensajes);
    if (mensajes.length > 0) {
        mensajes.forEach((msg) => {
          constMensajeHtml += `
            <div style="background-color: rgb(204, 230, 255); padding: 5px">  
            <span style="color: blue; font-weight: bold;">
                ${msg.author.id_email} </span>
              <span style="color:brown;"> [${msg.timestamp}]: &nbsp;</span>
              <span style="color:green; font-style:italic;"> ${msg.text}</span>
              </div> <hr/>`;
        });
        document.getElementById("mensajeria").innerHTML = constMensajeHtml;
        document.getElementById("subtituloPorcentaje").innerHTML = `(Compresi??n: ${porcentaje}%)`;
      }else{
        document.getElementById("mensajeria").innerHTML = `<div class="alert alert-info text-center" role="alert">No Hay Conversaciones...</div>`;
      }
  })
