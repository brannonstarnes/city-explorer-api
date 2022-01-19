'use strict'

const axios = require('axios');
let cache = require('../cache.js');

module.exports = handleGetMovies;

function handleGetMovies(req,res){
  
      const key = 'movie-' + city_name;
      const city_name = req.query.city_name;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&with_keyword=${city_name}`;
    
      if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
      } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
        .then(response => parseMovies(response.data.results));
      }
      
      return cache[key].data;
    }

      // let results = await axios.get(url);

      // let fetchedMovies = results.data.results;
      // console.log(fetchedMovies);
      // let movieData = fetchedMovies.map(singleMovie => new Movies(singleMovie));
      // console.log(movieData); THIS DOESN'T WORK
      
      function parseMovies(movieData){
        try {
          const movies = movieData.map(singleMovie => {
            return new Movies(singleMovie);
          });
          return Promise.resolve(movies);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      // if (movieData){
      //   res.status(200).send(movieData);
      // } else if (e instanceof TypeError) {
      //   res.status(e.name).send(e.message);
      // } else {
      //   res.status(500).send("Internal Server Error :/");
      // }
      //   res.status(500).send("Internal Server Error")
}
  
  
class Movies {
  constructor(obj){
    this.posterPath = obj.poster_path;
    this.title = obj.original_title;
    this.overview = obj.overview;
    this.releaseDate = obj.release_date;
    this.votes = obj.vote_average;
    this.voteCount = obj.vote_count;
  }
}