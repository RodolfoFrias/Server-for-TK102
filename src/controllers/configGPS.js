'use strict'

exports.parsingData = (data) => {
    if(data.toString().match("##,imei:.*,A;")){
        let res = data.toString().split(",");
        let imei = res[1];
        sock.write('**,'+res[1]+',C,20s');
        sock.write('LOAD');
        console.log("LOAD Sended");
    }else if(data.toString().match("^\\d+")){
        let res = data.toString().split(",");
        let comdevid = res[0].toString().split(":");
        let devid = comdevid[1];
        sock.write('ON');
        console.log('ON Sended');
    }
    else if(data.toString().match(devid)){
         let res = data.toString().split(",");
         let comdevid = res[0].toString().split(":");
         let devid = comdevid[1];
         let msg = res[1];
         let devdate = res[2];
         let admin_num = res[3];
         let info = res[4];
         let time = res[5];
         let code = res[6];
         let latitude = res[7];
         let posy = res[8];
         let longitude = res[9];
         let posx = res[10];
         let speed = res[11];
         let altitude = res[12];
         let date = new Date();

         
    /*console.log("IMEI: "+devid+" msg: "+msg+" fecha: "+devdate+" adminnum: "+admin_num+" info: "+info+
    "time: "+time+" code: "+code+" lat: "+lat +" lon: "+long +" posy: "+posy+" posx: "+posx+
    "speed: "+speed+" altitud: "+altitude+" date: "+date);*/

         let lat =  parseFloat(parseInt(latitude.substring(0,2))+parseFloat(latitude.substring(2,latitude.length))/60).toFixed(5);
	     let long  =   parseFloat(parseInt(longitude.substring(0,3))+parseFloat(longitude.substring(2,longitude.length))/60).toFixed(5);
         long = -long;

         
        let data = {
            "imei":devid,
            "lat":lat,
            "lon":long,
            "date":date
        }
        console.log(data);
        return data;
    }

    if(msg=="help me"){
        sock.write('**,'+res[0]+',E');
        console.log('SOS repeat disabled');
     }    
}