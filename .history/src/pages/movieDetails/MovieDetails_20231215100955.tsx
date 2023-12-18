import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Rating,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMovieDetails } from "../../redux/selector";

interface Movie {
  title: string;
  tagline: string;
  overview: string;
  trailerUrl: string;
  cast: string[];
  crew: string[];
  media: string[];
  posterPath: string;
}

const mockMovie: Movie = {
  title: "Inception",
  tagline: "Your mind is the scene of the crime",
  overview:
    "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within a person's subconscious during the dream state.",
  trailerUrl: "https://www.youtube.com/embed/8hP9D6kZseM",
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  crew: ["Christopher Nolan", "Hans Zimmer"],
  media: ["https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"],
  posterPath: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
};

type MovieDetails = {
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

type VideoPageDTO = {
  id: number;
  results: VideoResultDTO[];
};

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

export const MovieDetails = () => {
  const movieDetailSelector = useSelector(selectMovieDetails);
  // const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const movieId: number = 0;

  // const movieDetailSelector = useSelector(selectMovieDetails);
  const [movieDetails, setMovieDetails] = useState<MovieDTO | null>(null);
  const [castAndCrew, setCastAndCrew] = useState<MovieCreditsDTO | null>(null);
  const [videos, setVideos] = useState<VideoPageDTO | null>(null);
  const [popularMovies, setPopularMovies] = useState<MoviePopularDTO | null>(null);
  const [reviews, setReviews] = useState<ReviewListDTO | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieSimilarListDTO | null>(null);

  useEffect(() => {
    setMovie(movieDetailSelector);
    const movieId = movieDetailSelector?.movieId;

    const fetchMovieDetails = async () => {
      try {
        const apiKey = "ab517a924bb34407923d1e5fab7eccbd";

        const detailResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "ab517a924bb34407923d1e5fab7eccbd",
              language: "en-US",
            },
          }
        );
        console.log("detailResponse", detailResponse);
        setMovieDetails(detailResponse.data);

        // Fetch Cast and Crew
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        setCastAndCrew(castResponse.data);
        console.log("castResponse", castResponse);

        // Fetch Videos
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        setVideos(videosResponse.data.results);
        console.log("videosResponse", videosResponse);
        // Fetch Popular Movies
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        setPopularMovies(popularResponse.data.results);
        console.log("popularResponse", popularResponse);
        // Fetch Reviews
        const reviewsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
        );
        setReviews(reviewsResponse.data.results);
        console.log("reviewsResponse", reviewsResponse);
        // Fetch Similar Movies
        const similarResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
        );
        setSimilarMovies(similarResponse.data.results);
        console.log("similarResponse", similarResponse);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [
    movieDetailSelector,
    setCastAndCrew,
    setVideos,
    setPopularMovies,
    setReviews,
    setSimilarMovies,
  ]);

 /*  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);

  const handleOpenTrailerDialog = () => {
    setOpenTrailerDialog(true);
  };

  const handleCloseTrailerDialog = () => {
    setOpenTrailerDialog(false);
  };

  const steps = ["Overview", "Media", "Cast", "Crew"];

  const renderStepContent = (step: string) => {
    switch (step) {
      case "Overview":
        return <Typography>{mockMovie.overview}</Typography>;
      case "Media":
        return (
          <img src={mockMovie.media[0]} alt="Media" style={{ width: "100%" }} />
        );
      case "Cast":
        return <Typography>{mockMovie.cast.join(", ")}</Typography>;
      case "Crew":
        return <Typography>{mockMovie.crew.join(", ")}</Typography>;
      default:
        return null;
    }
  }; */


  const [trailerOpen, setTrailerOpen] = useState(false);

  const handleTrailerOpen = () => {
    setTrailerOpen(true);
  };

  const handleTrailerClose = () => {
    setTrailerOpen(false);
  };


    // Extract the YouTube trailer key
    const trailerKey = videos?.results?.find((video) => video.type === "Trailer")?.key;

    // Construct the YouTube trailer URL
    const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
  

  return (
    <>
    <Grid container spacing={2}>
      {/* Movie Poster and Overview */}
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Grid xs={3}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
            />
          </Card>
          </Grid>
          <Grid xs={9}>
            <>
              <Typography variant="h5" gutterBottom>
                {movieDetails?.title}
              </Typography>
              <Typography variant="subtitle1">{movieDetails?.tagline}</Typography>
              <Typography variant="body1">{movieDetails?.overview}</Typography>
              <Button variant="outlined" onClick={handleTrailerOpen}>
                Watch Trailer
              </Button>
            </>
            </Grid>
        </Paper>
        
        </Grid>

       {/* Cast and Crew */}
       <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Cast and Crew
          </Typography>
          {/* Use a horizontal slider for the cast and crew cards */}
          <div style={{ overflowX: "auto", display: "flex" }}>
            {castAndCrew?.cast.slice(0, 20).map((member) => (
              <Card key={member.id} style={{ marginRight: "16px" }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="subtitle2">{member.name}</Typography>
                  <Typography variant="body2">{member.character}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Paper>
       </Grid>

          {/* Other Sections (Videos, Popular Movies, Reviews, Similar Movies) */}
         {/* You can use similar structures for these sections */}
       </Grid>

    {/* Trailer Dialog */}
    <Dialog open={trailerOpen} onClose={handleTrailerClose}>
      <DialogContent>
        {/* Embed YouTube video */}
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  </>
);
};