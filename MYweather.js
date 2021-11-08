'use strict'

const axios = require('axios');
let cache = require('./cache.js');

async function handleGetWeather(req,res){

    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`;
  
    let response= await axios.get(url);
      
    let fetchedWeather = response.data.data;
    let forecastData = fetchedWeather.map(dailyWeather => new WeatherForecast(dailyWeather));
    
    if (forecastData){
      res.status(200).send(forecastData);
    } else if (e instanceof TypeError) {
      res.status(e.name).send(e.message);
    } else {
      res.status(500).send("Internal Server Error :/");
    }
  };

  class WeatherForecast {
    constructor(obj){
      this.datetime = obj.datetime;
      this.min_temp = obj.min_temp;
      this.max_temp = obj.max_temp;
      this.description = obj.weather.description;
      this.icon = obj.weather.icon;
    } 
  }

  module.exports = handleGetWeather;
  