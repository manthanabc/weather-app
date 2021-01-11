console.log('hmmmm')

const weatherform = document.querySelector('form')
const input = document.querySelector('input')
const messageone = document.querySelector('#message-one')
const messagetwo = document.querySelector('#message-two')

weatherform.addEventListener('submit', (e)=>{
	e.preventDefault()
	let address = input.value 
	messagetwo.textContent='Loading ...'
	fetch('/weather?address='+address).then((res)=>{
		console.log(res);
		res.json().then((json)=>{
	        if(json.error){
	            console.log(json.error)
	            messageone.textContent=json.error
	            messagetwo.textContent=''
	        } else {
	            console.log("temprature -"+json.temprature)
	            console.log("feelslike -"+json.feelslike)
	            console.log("windspeed -"+json.wind_speed)
	            messageone.textContent=''
	            messagetwo.textContent='Temprature is '+json.temprature+'c feelslike '+json.feelslike+'c and windspeed is '+json.wind_speed + ' km/hr'
	       	}
	    })
	})
})