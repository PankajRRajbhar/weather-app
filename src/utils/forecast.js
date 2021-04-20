const request = require("request")


const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9e80e02573c9a63ad9e7943e08566a74&query=' + latitude + ',' + longitude + '&units=f'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service..",undefined)
         }else if(body.error){
            callback("Unable to find the location.",undefined)
         }else{
            data=body.current
            callback(undefined,data.weather_descriptions[0] + ". It is currently " + data.temperature + " degree(s) out. It feels " + data.feelslike + " degree(s) out.")
         }
    })
}

module.exports= forecast