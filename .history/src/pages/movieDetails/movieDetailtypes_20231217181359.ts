/* interface Movie {
  title: string;
  tagline: string;
  overview: string;
  trailerUrl: string;
  cast: string[];
  crew: string[];
  media: string[];
  posterPath: string;
} */

/* const mockMovie: Movie = {
  title: "Inception",
  tagline: "Your mind is the scene of the crime",
  overview:
    "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within a person's subconscious during the dream state.",
  trailerUrl: "https://www.youtube.com/embed/8hP9D6kZseM",
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  crew: ["Christopher Nolan", "Hans Zimmer"],
  media: ["https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"],
  posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
}; */

type MovieDetail = {
  movieId: string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
};

/////////////////////////////typelar///////
//detayalr

type MovieDTO = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any; // null veya bir nesne olarak tanımlanabilir
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

//////
type MoviePopularDTO = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

type MovieResult = {
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
};

/////yorumlar

type ReviewDTO = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

type ReviewListDTO = {
  id: number;
  page: number;
  results: ReviewDTO[];
  total_pages: number;
  total_results: number;
};

///benzer içerik

type MovieSimilarkDTO = {
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
};

type MovieSimilarListDTO = {
  id: number;
  page: number;
  results: MovieSimilarkDTO[];
  total_pages: number;
  total_results: number;
};

// videos
type VideoResultDTO = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

/* type VideoPageDTO = {
    id: number;
    results: VideoResultDTO[];
  }; */

////crew and cast

type CastMemberDTO = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

type CrewMemberDTO = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

type MovieCreditsDTO = {
  cast: CastMemberDTO[];
  crew: CrewMemberDTO[];
  id: number;
};

type MovieImageDetails = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type MovieImageList = {
  id: number;
  backdrops: MovieImageDetails[];
  logos: MovieImageDetails[];
  posters: MovieImageDetails[];
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type {
  TabPanelProps,
  MovieImageList,
  MovieImageDetails,
  MovieCreditsDTO,
  CrewMemberDTO,
  CastMemberDTO,
  VideoResultDTO,
  MovieSimilarListDTO,
  MovieSimilarkDTO,
  ReviewListDTO,
  ReviewDTO,
  MovieResult,
  MoviePopularDTO,
  MovieDTO,
  MovieDetail,
};
