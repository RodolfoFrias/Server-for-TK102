'use strict'
//requiriendo dependencias 
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')

const app = express()//instancia de express
const server = http.createServer(app)//creando el server con http y express como handle request
const io = socketio(server)//iniciando el server de socket.io
const PORT = process.env.PORT || 3000

//corriendo el servidor
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
});

io.on('connection', function(socket){
    //imprimiendo el id del cliente conectado 
    console.log(`client: ${socket.id}`)
});


function map(id,lat,lon,date){

    var data = {
        "imei":id,
        "lat":lat,
        "lon":lon,
        "date":date
    }

    io.on('connection', function(socket){
        console.log(`client: ${socket.id}`)
        //enviando numero aleatorio cada dos segundo al cliente
        setInterval(() => {
          socket.emit('tracking', data)
        }, 2000);
        //recibiendo el numero aleatorio del cliente
        socket.on('client/random', (num) => {
          console.log(num);
        });
    });

}

app.use(express.static(path.join(__dirname, 'public')))//middleware de express para archivos estaticos

module.exports = {
    map
}
