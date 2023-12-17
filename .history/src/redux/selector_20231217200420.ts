import { RootState } from './store';

const selectMovieDetails = (state: RootState) => state.movie.movieDetails;
const getAdvencedFilterData = (state: RootState) => state.movie.advencedFilterData;

export {selectMovieDetails, getAdvencedFilterData}