'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const axios = require('axios');
const app = express(); 
const handleGetWeather = require('./weather.js');
const handleGetMovies = require('./movies.js');

app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', (req,res) => res.status(403).send('Not Found'));


app.listen(PORT, () =>console.log(`"I'm listening on ${PORT} - your server"`));
