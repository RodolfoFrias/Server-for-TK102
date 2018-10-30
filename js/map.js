'use strict'
window-addEventListener('load', function(){

        //es2015
        var socket = io();
        //enviando un numero random cada dos segundos
        /*setInterval(function(){
          socket.emit('client/random', Math.random())
        }, 2000);*/
        //recibiendo un numero random cada dos segundos
        socket.on('tracking', function(data){
          console.log(JSON.stringify(data));

        

        });

});