import axios from 'axios';
import {AdvancedFilter} from "./types"

const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY;

export const fetchBasicData = async (
  basicFilterSelector: string,
  currentPage: number,
) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          api_key: apiKey,
          query: basicFilterSelector,
          include_adult: 'false',
          language: 'en-US',
          page: currentPage,
        },
        headers: { accept: 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching basic data:', error);
    throw error;
  }
};

export const fetchAdvancedData = async (
  advancedFilterSelector: AdvancedFilter,
  currentPage: number,
) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: {
          api_key: apiKey,
          include_adult: advancedFilterSelector.include_adult,
          include_video: 'false',
          language: advancedFilterSelector.language,
          primary_release_year: advancedFilterSelector.primary_release_year,
          sort_by: advancedFilterSelector.sort_by,
          'vote_average.gte': advancedFilterSelector.vote_average.gte,
          'vote_average.lte': advancedFilterSelector.vote_average.lte,
          with_genres: advancedFilterSelector.with_genres,
          page: currentPage,
        },
        headers: { accept: 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching advanced data:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: {
            api_key: apiKey,
            language: 'en',
          },
        }
      );
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  };

  export const fetchMovieDetails = async (movieId: string) => {
    try {
      const imageResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
      );
      const detailResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
        },
      });
      const castResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      );
      const videosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      );
      const reviewsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
      );
  
      return {
        image: imageResponse.data,
        details: detailResponse.data,
        castAndCrew: castResponse.data,
        videos: videosResponse.data.results,
        reviews: reviewsResponse.data,
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };
