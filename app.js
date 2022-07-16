const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){


  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&units=metric&appid=246abb35deb70a477d88dca13dc5cdcd#";
  https.get(url,(response)=>
  {
  console.log(response.statusCode);

  response.on("data",function(data)
  {
  const WeatherData = JSON.parse(data);
  //console.log(WeatherData);
  const temp = WeatherData.main.temp;
  console.log(temp);
  const desp = WeatherData.weather[0].description;

  const icon = WeatherData.weather[0].icon;
  const icon_url = "http://openweathermap.org/img/wn/" + icon+"@2x.png";

  //alert(desp);
  res.write(" <h1>The condition on the clouds are "+ desp+"</h1>")
  res.write("<h1>The temperature in London is currently " + temp + " Degree celcius</h1>")
  res.write("<img src = "+ icon_url +">");
  res.send();
  })

  })
    // res.send("Server is up and running") Remember there can be only one res.send

})

app.listen(3000,function()
{
  console.log("server is running on port 3000")
})
