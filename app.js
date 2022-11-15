const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


const PORT = process.env.PORT || 3000

app.use(express.static('public'));
server.listen(PORT, () => console.log(`Servidor iniciado en ${PORT}`));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('socket conectado',socket.id);
  io.emit('impresionUsuarios', 'Nuevo socket conectado: ' + socket.id +`<br><br>` );

  socket.on('disconnect', () => {
  	console.log('socket desconectado',socket.id);
    io.emit('desconectado', {texto: 'Socket desconectado.'+ socket.id +`<br>`});
  
  });

  socket.on('envioMensajeria', function(contenido){
    console.log(contenido)
    var usuario = contenido[0]
    var mensaje = contenido[1]
    var completo = '<b>'+usuario + '</b>:'+ mensaje +`<br><br>`

    io.emit('impresionMensajeria', completo);
  
  });

  socket.on('escribiendo', function(usuario){
    console.log(usuario)
    var completo =`<b>` +usuario + ' está escribiendo'+`<br></b>`
    socket.broadcast.emit('usuarioEscribiendo', completo);
  
  });

});
