'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const axios = require('axios');
const app = express(); 

app.use(cors());


const PORT = process.env.PORT;

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', (req,res) => res.status(403).send('Not Found'));


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

async function handleGetMovies(res,req){
  try{
    const city_name = req.query.city_name;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&with_keyword${city_name}`;
  
    let response = await axios.get(url);

    let fetchedMovies = response.data;
    console.log(fetchedMovies);
  } catch (e){
      res.status(500).send("Internal Server Error")
    }
}




app.listen(PORT, () =>console.log(`"I'm listening on ${PORT} - your server"`));
