request = require('request')

const geocode=(address,callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?worldview=cn&access_token=pk.eyJ1IjoibWFudGhhbjIwMDUiLCJhIjoiY2tqbGF2czRsMjIzcDJxbzdkdHlkdjRiNyJ9.xfHImyW6seygUQE7qSY8bw'

    request({ url, json:true },(err, {body})=>{
        if(err){
           callback('unable to access mapbox.',undefined) 
        } else if (!body.features) {
           callback('unable to find location.',undefined)  
        } else {
           callback(undefined, { latitude:body.features[0].center[1], longitude:body.features[0].center[0], place:body.features[0].place_name})
        }
  })
}

module.exports = geocode