'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const axios = require('axios');
// const weatherJSON = require('./data/weather.json');

const app = express(); 

app.use(cors());


const PORT = process.env.PORT;

//get method takes (route, callbackHandler(req,res)) 
//the callback always need args of req, res
app.get('/weather', handleGetWeather);
app.get('/*', (req,res) => res.status(403).send('Not Found'));


async function handleGetWeather(req,res){

const city_name = req.query.city;
const lat = req.query.lat;
const lon = req.query.lon;

console.log('weather route hit')
  try {
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`

    let res= await axios.get(url);
    console.log('MADE IT HERE>>>>>>',res.data)
    const fetchedWeather = res.data;

    if (fetchedWeather) {
      const forecastData = fetchedWeather.map(city => new WeatherForecast(city));
      console.log(forecastData);
      res.status(200).send(forecastData);
    } else {
      res.status(404).send('city not found');
    }
  
  } catch(e){
    res.status(500).send('server error')
  }


  //respond with status 200 "ok" and send the weather.json 
  res.status(200).send(res.data)
  
}

class WeatherForecast {
  constructor(obj){
    this.datetime = obj.datetime;
    this.min_temp = obj.min_temp;
    this.max_temp = obj.max_temp;
    this.description = obj.weather.description
  } 
}

app.listen(PORT, () =>console.log(`"I'm listening on ${PORT} - your server"`));

