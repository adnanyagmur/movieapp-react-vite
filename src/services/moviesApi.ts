import tmdbService from '../services/tmdbService';

export const getPopularMovies = async () => {
  try {
    const response = await tmdbService.get('/discover/movie', {
      params: {
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await tmdbService.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await tmdbService.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error searching movies for query "${query}":`, error);
    throw error;
  }
};