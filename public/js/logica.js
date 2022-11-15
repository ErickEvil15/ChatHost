
var socket = io.connect();

var notificaciones = [];
var usuarios = [];
var usuario = document.getElementById('usuario').value;
var mensaje =document.getElementById('mensaje').value

socket.on('conectado', function (data) {
  
  console.log(data);
});

socket.on('desconectado', function (data) {
  
  console.log(data);
});


function mensajeria(contenido){

  var contenido = [
    document.getElementById('usuario').value,
    document.getElementById('mensaje').value
  ];
  document.getElementById('usuario').setAttribute('hidden','hidden'),
  document.getElementById('Usuario').setAttribute('hidden','hidden'),

    console.log(contenido)
    socket.emit("envioMensajeria",contenido)
    document.getElementById('mensaje').value = ""

}

document.getElementById('mensaje').addEventListener("keydown", (event) => {
  var usuario2 = document.getElementById('usuario').value;
  socket.emit('escribiendo', usuario2)
})



socket.on('usuarioEscribiendo', function (completo){
  console.log(completo)
  var personas = []
  personas.push(completo)
  console.log(personas)
  document.querySelector('#escribiendo').innerHTML = personas
});

socket.on('impresionMensajeria', function (contenido) {
  
  notificaciones.push(contenido)
  document.querySelector('#mensajeriauwu').innerHTML = notificaciones
  document.querySelector('#escribiendo').innerHTML = ""
  
});
socket.on('impresionUsuarios', function (contenido) {
  
  usuarios.push(contenido)
  document.querySelector('#sidebar').innerHTML = usuarios
  
});