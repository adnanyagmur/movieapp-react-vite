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
  }

  export type { AdvancedFilter}
