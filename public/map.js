'use strict'
window.addEventListener('load', function(){

  var map;
  function initMap() {
    
      map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {
        lat: ,
        lng: 
      }
    });
    
  }
  initMap();

  //es2015
  var socket = io();
  //enviando un numero random cada dos segundos
  /*setInterval(function(){
  socket.emit('client/random', Math.random())
  }, 2000);*/
  //recibiendo un numero random cada dos segundos
  socket.on('tracking', function(data){
          
  console.log(data);
  var location =  JSON.parse(JSON.stringify(data));
  console.log(location.lat + " " + location.lon)
  var fenway = {
     lat: parseFloat(location.lat),
     lng: parseFloat(location.lon) 
    };

  var marker = new google.maps.Marker({
    position: fenway,
    title:"Hello World!"
  });

  setInterval(function(){
    marker.setMap(null);
    marker.setMap(map);
  }, 5000);
    
  });

});
