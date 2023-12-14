import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/moviesApi'
import axios from 'axios';

export const HomePage = () => {





  const [movies, setMovies] = useState([]);

  useEffect(() => {
   // console.log("asdasdasdasdasd", process.env.REACT_APP_TMDB_API_KEY)
    const fetchData = async () => {
      try {
        const response = await axios.get(
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

        setMovies(response.data.results);
        console.log("asdasdasdasdasd", response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>HomePage</div>
  )
}

