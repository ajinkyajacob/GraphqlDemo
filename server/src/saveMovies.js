const mongoose = require('mongoose');

const apiKey = '9d0139e3';
const maxMovies = 100;
const movies = [];

// Mongoose Schema and Model
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  rating: { type: String },
  time: { type: String },
  year: { type: String }
});

const Movie = mongoose.model('Movie', movieSchema);

const formatMovie = (data) => ({
  title: data.Title,
  description: data.Plot,
  imageUrl: data.Poster,
  rating: data.imdbRating,
  time: data.Runtime,
  year: data.Year,
});

const fetchMovies = async (query, type = 'movie', page = 1) => {
  try {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=${type}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      for (const item of data.Search) {
        // Get detailed info for each movie
        const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${item.imdbID}&plot=short`;
        const detailsResponse = await fetch(detailsUrl);
        const details = await detailsResponse.json();

        if (details.Response === 'True') {
          movies.push(formatMovie(details));
          if (movies.length >= maxMovies) return;
        }
      }
    }
  } catch (error) {
    console.error('Error fetching movies:', error.message);
  }
};

const getMovies = async () => {
  const hollywoodQueries = ['top rated', 'Oscar', 'blockbuster'];
  const bollywoodQueries = ['Bollywood', 'top rated Hindi', 'Bollywood blockbuster'];

  for (const query of hollywoodQueries) {
    for (let page = 1; page <= 5; page++) {
      await fetchMovies(query, 'movie', page);
      if (movies.length >= maxMovies) break;
    }
  }

  for (const query of bollywoodQueries) {
    for (let page = 1; page <= 5; page++) {
      await fetchMovies(query, 'movie', page);
      if (movies.length >= maxMovies) break;
    }
  }

  // Save movies to MongoDB
  try {
    await Movie.insertMany(movies.slice(0, maxMovies));
    console.log('Movies saved to MongoDB successfully!');
  } catch (error) {
    console.error('Error saving movies to MongoDB:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// MongoDB Connection and Execution
const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/gq', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    await getMovies();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

start();
