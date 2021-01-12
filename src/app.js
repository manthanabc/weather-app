const geocode = require('../utils/geocode')
const weather = require('../utils/weather')
const path = require('path')
const hbs = require('hbs')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// paths used by express
const PublicDirPath = path.join(__dirname, '../public')
const viewsPathDir = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

//setup engine and paths
app.set('views', viewsPathDir)
app.set('view engine', 'hbs')

//configure to use public folder for static files
app.use(express.static(PublicDirPath))

app.get('', (req, res)=> {
	res.render('index',{
		title : 'Weather App',
		name : 'mandalorian'
	})
})

app.get('/about', (req, res)=> {
	res.render('about',{
		title : 'About',
		name : 'mandalorian'
	})
})

app.get('/help', (req, res)=> {
	res.render('Help',{
		title : 'Weather App',
		name : 'mandalorian',
		message : 'this is a help message'
	})
})

app.get('/help/*', (req, res)=> {
	res.render('notFound', {
		message:"help not found",
		title : 'Help',
		name : 'mandalorian'
	})
})

app.get('/weather', (req, res)=> {

	if(!req.query.address) {
		return res.send({
			error:"no address provided"
		})
	}

    geocode(req.query.address, (err, {latitude, longitude} = {})=>{
    	if(err) {
     		return res.send({error:err}) 
   		}

   		weather(latitude, longitude,(err, {temprature, feelslike, wind_speed}={}) => {
      		if(err) {
        		return res.send({error:err})
      		}
      		res.send({
				temprature,
				feelslike,
				wind_speed,
				address:req.query.address
			})
   		})
  	})
})
 
app.get('/testep', (req,res)=>{
	if(!req.query.search) {
		return res.send({error:"nondf"})
	} 
	res.send({test:"temprature"})
})

app.get('*', (req, res)=> {
	res.render('notFound', {message:"page not found"})
})

app.listen(port,()=>{console.log("running on port 3000")})
