const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/" , function(req,res){

  const apiKey="181fee60a57c3bb5882a183ea762242e";
  const query=req.body.Cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric"
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The Temperature in "+query+" is " + temp + "Degree Celsius </h1>");
      res.write("<h5>The Weather Forecast is: " + des + " </h5>");
      res.write("<img src=" + imageUrl + ">");
      res.send();

    });

  });

});





app.listen(3000, function() {
  console.log("The server is running on port 3000");
});
