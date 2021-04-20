console.log("Client side javacript");



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{

    messageOne.textContent="Loading..."
    messageTwo.textContent =""
    e.preventDefault()
    const location=search.value

    fetch("http://localhost:3000/weather?address=" + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
             messageOne.textContent=data.error
        }else{
            messageOne.textContent="Forecast: " + data.forecast
            messageTwo.textContent= "Location: " + data.location

            // console.log("Address:" + data.address)
        }
    })
})
    // console.log(location)

})

// weatherForm.addEventListner('submit',(e)=>{
//     e.preventDefault()
//     console.log("Data")
// })