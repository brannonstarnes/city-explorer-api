'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 

const app = express(); 

app.use(cors());

app.listen(3001, () =>console.log("I'm listening - your server"));