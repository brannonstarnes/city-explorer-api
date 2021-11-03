'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const weather = require('./data/weather.json');

const app = express(); 

app.use(cors());


const PORT = process.env.PORT;

//get method takes (route, callbackHandler(req,res)) 
//the callback always need args of req, res
app.get('/weather', handleGetWeather);


function handleGetWeather(req,res){
//respond with status 200 "ok" and send the weather.json 
  res.status(200).send(weather)
  console.log(req.query.lat)
}

app.listen(PORT, () =>console.log(`"I'm listening on ${PORT} - your server"`));

