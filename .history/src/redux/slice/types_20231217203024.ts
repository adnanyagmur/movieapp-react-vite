type MovieState = {
    
      title: string;
      overview: string;
      releaseDate: string;
      posterPath: string;
      voteAverage: number;
      movieId:string;
    
  }

  type AdvancedFilter = {
    sort_by: string;
    include_adult: boolean;
    primary_release_year: number;
    language: string;
    with_genres: string;
    vote_average: {
      gte: number;
      lte: number;
    };
  };



  type Index = {
    movieDetails: MovieState
    advencedFilterData:AdvancedFilter
    basicSearchText:string
  }


  export type {Index,MovieState, AdvancedFilter,}
  