import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/moviesApi'
import axios from 'axios';
import MovieCard from '../../components/MovieCard';


type MovieItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type ApiResponse = {
  data: {
    page: number;
    results: MovieItem[];
    total_pages: number;
    total_results: number;
  };
}

export const HomePage = () => {





  const [movies, setMovies] = useState<ApiResponse>();
  const [results, setResults] = useState<Array<MovieItem>>()

  useEffect(() => {
   // console.log("asdasdasdasdasd", process.env.REACT_APP_TMDB_API_KEY)
    const fetchData = async () => {
      try {
        const response: ApiResponse = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: "ab517a924bb34407923d1e5fab7eccbd",
              language: 'en-US',
              sort_by: 'popularity.desc',
              include_adult: false,
              include_video: false,
             page: 220,
            },
          }
        );

        setMovies(response?.data);
        setResults(response.data.results)
        console.log("asdasdasdasdasd", response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
       {results.map((movie: MovieItem) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          overview={movie.overview}
          releaseDate={movie.release_date}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
        />
      ))}
    </div>
  )
}

