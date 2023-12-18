// src/redux/movieSelectors.ts
import { RootState } from './store';

export const selectMovieDetails = (state: RootState) => state.movie.movieDetails;