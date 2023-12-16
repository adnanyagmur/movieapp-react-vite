import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Rating,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMovieDetails } from "../../redux/selector";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useParams } from "react-router-dom";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import VideocamIcon from "@mui/icons-material/Videocam";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";

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

export const MovieDetails = () => {
  const { movieId } = useParams();
  const movieDetailSelector = useSelector(selectMovieDetails);
  // const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  //const movieId: number = 0;

  // const movieDetailSelector = useSelector(selectMovieDetails);
  const [movieDetails, setMovieDetails] = useState<MovieDTO>();
  const [castAndCrew, setCastAndCrew] = useState<MovieCreditsDTO | null>(null);
  const [videos, setVideos] = useState<VideoResultDTO[]>([]);
  const [popularMovies, setPopularMovies] = useState<MoviePopularDTO | null>(
    null
  );
  const [reviews, setReviews] = useState<ReviewListDTO | null>(null);
  const [similarMovies, setSimilarMovies] =
    useState<MovieSimilarListDTO | null>(null);

  const [movieImage, setMovieImage] = useState<MovieImageList>();

  useEffect(() => {
    setMovie(movieDetailSelector);
    const movieId = movieDetailSelector?.movieId;

    const fetchMovieDetails = async () => {
      try {
        const apiKey = "ab517a924bb34407923d1e5fab7eccbd";

        // Fetch Cast and Crew
        const imageResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
        );
        setMovieImage(imageResponse.data);
        console.log("image", imageResponse);

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

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedTrailers, setSelectedTrailers] = useState<VideoResultDTO[]>(
    []
  );

  const filterTrailers = (videosTrailer: VideoResultDTO[]) => {
    const filteredTrailers = videosTrailer.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    setSelectedTrailers(filteredTrailers);
  };

  const handleTrailerOpen = () => {
    setTrailerOpen(true);
    filterTrailers(videos);
  };

  const handleTrailerClose = () => {
    setTrailerOpen(false);
  };

  // Construct the YouTube trailer URL
  const trailerUrl = `https://www.youtube.com/embed/${selectedTrailers[0]?.key}`;

  console.log(selectedTrailers);




  return (
    <>
      <Grid container spacing={2}>
        {/* Movie Poster and Overview */}
        <Grid item xs={12}>
          {/*     <Paper elevation={3} sx={{ m: 2, backgroundImage: `url('your-image-url')`, backgroundSize: 'cover', minHeight: 400 }}> */}

          {/*  <Paper elevation={3} sx={{ m: 2, position: 
      'relative', overflow: 'hidden',
       paddingBottom: '56.25%' /* 16:9 aspect ratio  }}> */}
          {/*  <Paper elevation={3} sx={{ 
            m: 2, position: 'relative', overflow: 'hidden', 
            paddingBottom: '56.25%', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}> */}

          {/*    <Paper
            elevation={3}
            sx={{
              m: 2,
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieImage?.backdrops[0].file_path})`,
              
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 1)",
             
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: -1,
            }}
          > */}

          <Paper
            elevation={3}
            sx={{
              m: 2,
            /*   position: "relative",
              overflow: "hidden",
            //  paddingBottom: "56.25%",
              backgroundColor: "rgba(155, 155, 155, 0.3)", */
            }}
          >
          {/*   <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieImage?.backdrops[0]?.file_path})`,
                backgroundSize: "cover",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -1,
              }}
            /> */}

{
  
movieImage?.backdrops.map((file_path, index) => (

  <CardMedia
component="img"
  height="500"
image={`https://image.tmdb.org/t/p/w500${file_path}`}
alt={movieDetails?.title}
/>
         /*    <div
              key={index}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${file_path})`,
                backgroundSize: 'cover',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: `${index * 100}%`,
                zIndex: -1,
              }}
            /> */
          ))}
            
            <Stack direction="row" spacing={2} >
              <Grid xs={5}>
                <Card sx={{ maxWidth: 350, maxHeight: 490, m: 3 }}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
                    alt={movieDetails?.title}
                  />
                </Card>
              </Grid>
              <Grid xs={7}>
                <Stack direction="column" spacing={2} sx={{ m: 3 }}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontFamily: "fantasy" }}
                  >
                    {movieDetails?.title}
                  </Typography>
                  <Grid>
                    <Chip
                      label={movieDetails?.release_date}
                      variant="filled"
                      color="warning"
                      icon={<HistoryEduIcon />}
                    />
                  </Grid>
                  <Stack direction="row" spacing={2} sx={{ m: 3 }}>
                    {movieDetails?.genres.map(
                      (genre: { id: number; name: string }) => (
                        <Chip
                          label={genre?.name}
                          variant="outlined"
                          color="warning"
                        >
                          {/*  <Typography gutterBottom sx={{ fontFamily: "cursive" }}>
                          {genre?.name}
                        </Typography> */}
                        </Chip>
                      )
                    )}
                  </Stack>
                  <Stack direction="row" sx={{ m: 3 }}>
                    <Rating
                      name="movie-rating"
                      value={
                        movieDetails?.vote_average
                          ? movieDetails?.vote_average / 2
                          : 0
                      }
                      precision={0.5}
                      readOnly
                      sx={{ marginRight: "1rem", mt: 1 }}
                    />

                    <Button
                      variant="text"
                      color="warning"
                      onClick={handleTrailerOpen}
                      sx={{ pt: 1 }}
                      startIcon={<LiveTvIcon />}
                    >
                      Watch Trailer
                    </Button>
                  </Stack>

                  <Typography variant="subtitle1">
                    {movieDetails?.tagline}
                  </Typography>

                  <Typography variant="body1">
                    {movieDetails?.overview}
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Paper>
        </Grid>

        {/* Cast and Crew */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, m: 2 }}>
            <Stack direction={"row"}>
              <Grid item sx={{ pt: 1, pl: 1 }}>
                <VideocamIcon /> <FaceIcon /> <Face2Icon />
              </Grid>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontFamily: "fantasy", ml: 2, mb: 1 }}
              >
                Lead actors
              </Typography>
            </Stack>
            {/* Use a horizontal slider for the cast and crew cards */}
            <div style={{ overflowX: "auto", display: "flex" }}>
              {castAndCrew?.cast.slice(0, 10).map((member) => (
                <Card
                  key={member.id}
                  style={{ minWidth: 150, margin: "0 8px" }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontFamily: "cursive" }}
                    >
                      {member.name}
                    </Typography>
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
        <DialogContent sx={{ p: 0, m: 0 }}>
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

/* 
<CardMedia
component="img"
//   height="500"
image={`https://image.tmdb.org/t/p/w500${movieImage?.backdrops[0].file_path}`}
alt={movieDetails?.title}
/>
<CardMedia
component="img"
//  height="500"
image={`https://image.tmdb.org/t/p/w500${movieImage?.logos[0].file_path}`}
alt={movieDetails?.title}
/>
<CardMedia
component="img"
// height="500"
image={`https://image.tmdb.org/t/p/w500${movieImage?.posters[0].file_path}`}
alt={movieDetails?.title}
/> */
