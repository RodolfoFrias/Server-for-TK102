'use strict';

window.addEventListener('load', () => {
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {
        lat: 20.6221438,
        lng: -100.415529613,
      }
    });
  }

  initMap();

  let socket = io();
  socket.on('tracking', function(data){
          
    console.log(data);
    let location =  JSON.parse(JSON.stringify(data));
    //console.log(location.lat + " " + location.lon);

    let fenway = {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon) 
    };

    let marker = new google.maps.Marker({
      position: fenway,
      title:"Hello World!"
    });

    setInterval(function(){
      marker.setMap(map);
    }, 5000);
    
  });
});




