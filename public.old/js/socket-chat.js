var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.get('nombre') || !params.get('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});


socket.on('crearMensaje', function (data) {
    console.log('Servidor: ', data);
});

socket.on('listaPersonas', function (data) {
    console.log('Usuarios: ', data);
});

socket.on('mensajePrivadoHaciaCliente', function (data) {
    console.log('Mensaje Privado: ', data);
});