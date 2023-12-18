// src/redux/movieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdvancedFilter, Index, MovieState } from './types';


const initialState= {
  movieDetails: null,
  advencedFilterData: {
    sort_by: "popularity.desc",
    include_adult: false,
    primary_release_year: 0,
    language: "en-US",
    with_genres: "",
    vote_average: {
      gte: 0,
      lte: 10,
    },
  },
  basicSearchText:""
} as unknown as Index

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    commitMovieDetails: (state, action: PayloadAction<MovieState>) => {
      state.movieDetails = action.payload;
    },
    commitAdvencedFilterData:(state, action: PayloadAction<AdvancedFilter>) => {
      state.advencedFilterData = action.payload;
    },
  },
});

export const { commitMovieDetails, commitAdvencedFilterData } = movieSlice.actions;

export default movieSlice.reducer;