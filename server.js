'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const weatherJSON = require('./data/weather.json');

const app = express(); 

app.use(cors());


const PORT = process.env.PORT;

//get method takes (route, callbackHandler(req,res)) 
//the callback always need args of req, res
app.get('/weather', handleGetWeather);
app.get('/*', (req,res) => res.status(403).send('Not Found'));


function handleGetWeather(req,res){
//client makes get req to /weather
// include params for name, lat, lon
//the request obj as a prop query which is also an object
const cityName = req.query.city;
const lat = req.query.lat;
const lon = req.query.lon;
console.log(req.query);
console.log('weather route hit')
  try {
    const cityToSend = weatherJSON.find(city => {
      console.log(city.city_name);
      if(city.lat === lat && city.lon === lon || city.city_name === cityName) {
        return true
      }
        return false;
    });
    if (cityToSend) {
      const forecastData = cityToSend.data.map(city => new WeatherForecast(city));
      console.log(forecastData);
      res.status(200).send(forecastData)
    } else {
      res.status(404).send('city not found');
    }
  
  } catch(e){
    res.status(500).send('server error')
  }


  //respond with status 200 "ok" and send the weather.json 
  res.status(200).send(weatherJSON)
  console.log(req.query.lat)
}

class WeatherForecast {
  constructor(obj){
    this.min_temp = obj.min_temp;
    this.max_temp = obj.max_temp;
    this.description = obj.weather.description
  }
}

app.listen(PORT, () =>console.log(`"I'm listening on ${PORT} - your server"`));

