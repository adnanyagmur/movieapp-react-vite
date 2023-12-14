import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
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

export const FavoriteLists = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieItem[]>([]);

  useEffect(() => {
    // Retrieve favorite movies from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteMovies(favorites);
  }, []);

  const handleFavoriteClick = (movie: MovieItem) => {
    // Handle favorite click if needed
  };

  return (
    <Grid container spacing={1} sx={{ m: 3 }}>
      {favoriteMovies.map((movie: MovieItem) => (
        <Grid item key={movie.id} xs={12} sm={6} md={3}>
          <MovieCard
            key={movie.id}
            movieId={movie.id.toString()}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            onFavoriteClick={() => handleFavoriteClick(movie)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
