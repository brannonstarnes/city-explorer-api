'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const weather = require('./modules/weather.js');
const app = express();

app.use(cors());

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(process.env.PORT, () => console.log(`Server up on ${PORT}`));