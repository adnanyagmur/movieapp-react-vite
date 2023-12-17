import { RootState } from './store';

const selectMovieDetails = (state: RootState) => state.movie.movieDetails;
const getAdvencedFilterData = (state: RootState) => state.movie.advencedFilterData;
const getBasicFilterData = (state: RootState) => state.movie.basicSearchText;

export {selectMovieDetails, getAdvencedFilterData}