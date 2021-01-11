request=require("request")

const getWeather=(lat,long,callback)=>{
url='http://api.weatherstack.com/current?access_key=d3508a9fdc9848f0231af096bc6a43bb&query='+lat+","+long
 request({ url, json:true },(err, {body})=>{
      if(err) {
          callback("unable to connect to weathstack", undefined)
      } else if (body.success === false) {
          callback("cannot find location", undefined) 
      } else {
          callback(undefined,{
                                      temprature :body.current.temperature, 
                                      feelslike : body.current.feelslike, 
                                      discription :body.current.weather_descriptions[0], 
                                      wind_speed : body.current.wind_speed
           })
      }
 })
}

module.exports = getWeather