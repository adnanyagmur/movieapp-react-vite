import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/moviesApi'

export const HomePage = () => {





  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);

        console.log("popularrrrr",popularMovies)
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

