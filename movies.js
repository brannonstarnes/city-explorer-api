'use strict'

const axios = require('axios');


async function handleGetMovies(req,res){
  
      const city_name = req.query.city_name;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&with_keyword=${city_name}`;
    
      let results = await axios.get(url);

      let fetchedMovies = results.data.results;
      console.log(fetchedMovies);
      let movieData = fetchedMovies.map(singleMovie => new Movies(singleMovie));
      // console.log(movieData); THIS DOESN'T WORK
      
      if (movieData){
        res.status(200).send(movieData);
      } else if (e instanceof TypeError) {
        res.status(e.name).send(e.message);
      } else {
        res.status(500).send("Internal Server Error :/");
      }
        res.status(500).send("Internal Server Error")
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

  module.exports = handleGetMovies;