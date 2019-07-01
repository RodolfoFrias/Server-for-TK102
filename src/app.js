'use strict'

const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')

const app = express()//instancia de express
const server = http.createServer(app)//creando el server con http y express como handle request
const io = socketio(server)//iniciando el server de socket.io
const webPORT = process.env.PORT || 3000

//Serviodor TCP
const net = require('net');
const HOST = '127.0.0.1';
const tcpPORT = process.env.PORT || 2345;

app.use(express.static(path.join(__dirname, '/public')))//middleware de express para archivos estaticos

const parseData = require('./controllers/configGPS');

net.createServer(function(sock) {

console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

const sockets = [];
const gpsData = {};

sock.on('data', function(data) {
    console.log("DATA: "+data)
    sockets.push(sock);

    gpsData = parseData(data);

    console.log(gpsData);

    //util.saveDb(devid,lat,long,date );
      
});


sock.on('close', function(data){
    let index = sockets.findIndex(function(o) {
        return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
    })
    if (index !== -1) sockets.splice(index, 1);
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
});

}).listen(tcpPORT, HOST, function(){
    console.log("listening on port: "+tcpPORT+" and host: "+HOST);
});

server.listen(webPORT, () => {
    console.log(`Server running in http://localhost:${webPORT}`)
 });

io.on('connection', function(socket){
    console.log(`client: ${socket.id}`)
    //enviando numero aleatorio cada dos segundo al cliente
    setInterval(() => {
      socket.emit('tracking', 'imei:864894030211644,tracker,181115173729,,F,223730.00,A,2040.96714,N,10026.08774,W,,;')
    }, 5000);
    //recibiendo el numero aleatorio del cliente
    socket.on('client/random', (num) => {
      console.log(num);
    });
});
