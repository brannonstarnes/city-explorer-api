'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const axios = require('axios');

const app = express(); 

app.use(cors());


const PORT = process.env.PORT;

app.get('/weather', handleGetWeather);
app.get('/*', (req,res) => res.status(403).send('Not Found'));


async function handleGetWeather(req,res){

  const lat = req.query.lat;
  const lon = req.query.lon;

    console.log('weather route hit')
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`;

  let response= await axios.get(url);
    
  let fetchedWeather = response.data.data;
  let forecastData = fetchedWeather.map(dailyWeather => new WeatherForecast(dailyWeather));
     console.log(forecastData);
  res.status(200).send(forecastData);
     console.log("SENT");  
};
  

class WeatherForecast {
  constructor(obj){
    this.datetime = obj.datetime;
    this.min_temp = obj.min_temp;
    this.max_temp = obj.max_temp;
    this.description = obj.weather.description
  } 
}

app.listen(PORT, () =>console.log(`"I'm listening on ${PORT} - your server"`));

