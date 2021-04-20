const path=require("path")
const express=require("express")
const app= express()
const hbs=require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")
const request=require("request")


const { title, send } = require("process")
const geoCode = require("./utils/geocode")

//extracting the path
const pathToPublicFolder=path.join(__dirname,"../public")
const pathView=path.join(__dirname,"../templates/views")
const pathPartials=path.join(__dirname,"../templates/partials")

//setting the view engine and views
app.set("view engine","hbs")
app.set("views",pathView)
hbs.registerPartials(pathPartials)

//setup static directory to serve
app.use(express.static(pathToPublicFolder))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"Pankaj"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Pankaj Rajbhar"
    })
})


app.get("/help",(req,res)=>{
    res.render("help",{
        helpText:"Its an help message!!",
        title:"Help",
        name:"Pankaj"
    })
})

app.get('/product',(req,res)=>{
    res.send({
        product:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must privide the address!"
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                   return  res.send({error})
                }
                    res.send({
                        forecast:forecastData,
                        location,
                        address:req.query.address
                    }) 
            })
        
    })

   
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        error:"Help article not found!",
        name:"Pankaj",
        title:"404"
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        error:"Page not found!!",
        name:"Pankaj",
        title:"404"
    })
})

app.listen(3000,()=>{
    console.log("server is up and running!!!")
})