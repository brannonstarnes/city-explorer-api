'use strict'

const axios = require('axios');


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
  
  module.exports = handleGetMovies;