import {
  Box,
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
  Tab,
  Tabs,
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
import PeopleIcon from "@mui/icons-material/People";
import MovieActors from "../../components/MovieActors";
import MovieVideo from "../../components/MovieVideo";
import MoviePoster from "../../components/MoviePoster";
import { MovieReview } from "../../components/MovieReview";

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

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

//review

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const MovieDetails = () => {
  
  const { movieIdParams } = useParams();

  console.log("useParam", movieIdParams)
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
  //const [movieReviewList, setMovieReviewList] = useState<MovieReview[]>([]);
  useEffect(() => {
    setMovie(movieDetailSelector);
    const movieId =  movieIdParams

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
        setReviews(reviewsResponse.data);
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

  ///Tab ayarları

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{m: 2, }}>
            <Stack direction="row" spacing={2}>
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
                        ></Chip>
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
                      sx={{ pt: 1, fontFamily: "fantasy" }}
                      startIcon={<LiveTvIcon />}
                    >
                      Watch Trailer
                    </Button>
                  </Stack>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "cursive" }}
                  >
                    {movieDetails?.tagline}
                  </Typography>

                  <Typography variant="body1" sx={{ fontFamily: "cursive" }}>
                    {movieDetails?.overview}
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Paper>
        </Grid>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="primary"
              sx={{ pl: 4 }}
            >
              <Tab
                label="Lead actors"
                icon={<PeopleIcon />}
                iconPosition="start"
              />
              <Tab label="Videos" />
              <Tab label="Posters" />
              <Tab label="Comments" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <MovieActors cast={castAndCrew ? castAndCrew?.cast : []} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MovieVideo videos={videos} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MoviePoster posters={movieImage?.posters as never} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <MovieReview results={reviews?.results as never} />
          </CustomTabPanel>
        </Box>
      </Grid>
      <Dialog open={trailerOpen} onClose={handleTrailerClose}>
        <DialogContent sx={{ p: 0, m: 0 }}>
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
