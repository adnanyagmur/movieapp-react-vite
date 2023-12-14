import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

if (!apiKey) {
  throw new Error('TMDB API key is missing in the environment variables.');
}

const tmdbService = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'en-US',
  },
});

export default tmdbService;