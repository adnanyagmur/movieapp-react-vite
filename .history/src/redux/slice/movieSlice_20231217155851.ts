// src/redux/movieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieState } from './types';


const initialState: MovieState = {
  movieDetails: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovieDetails: (state, action: PayloadAction<MovieState["movieDetails"] | null>) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { setMovieDetails } = movieSlice.actions;

export default movieSlice.reducer;
