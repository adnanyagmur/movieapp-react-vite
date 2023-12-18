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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMovieDetails } from "../../redux/selector";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useParams } from "react-router-dom";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PeopleIcon from "@mui/icons-material/People";
import MovieActors from "../../components/MovieActors";
import MovieVideo from "../../components/MovieVideo";
import MoviePoster from "../../components/MoviePoster";
import { MovieReview } from "../../components/MovieReview";
import {
  TabPanelProps,
  MovieImageList,
  MovieCreditsDTO,
  VideoResultDTO,
  MovieSimilarListDTO,
  ReviewListDTO,
  MoviePopularDTO,
  MovieDTO,
  MovieDetail
} from "./movieDetailtypes";
import { fetchMovieDetails } from "../../services/api";

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
  const movieIdParams = useParams();
  const movieDetailSelector = useSelector(selectMovieDetails);

  //const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDTO>();
  const [castAndCrew, setCastAndCrew] = useState<MovieCreditsDTO | null>(null);
  const [videos, setVideos] = useState<VideoResultDTO[]>([]);
/*   const [popularMovies, setPopularMovies] = useState<MoviePopularDTO | null>(
    null
  ); */
  const [reviews, setReviews] = useState<ReviewListDTO | null>(null);
  //const [similarMovies, setSimilarMovies] =
    useState<MovieSimilarListDTO | null>(null);

  const [movieImage, setMovieImage] = useState<MovieImageList>();
  const [value, setValue] = useState(0);



  useEffect(() => {
   // setMovie(movieDetailSelector);
    const movieId : number= movieDetailSelector?.movieId
      ? parseInt(movieDetailSelector?.movieId)
      : parseInt(movieIdParams?.id as never)

    const fetchData = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieImage(details.image);
        setMovieDetails(details.details);
        setCastAndCrew(details.castAndCrew);
        setVideos(details.videos);
        setReviews(details.reviews);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchData();
  }, [
    movieDetailSelector,
    //setCastAndCrew,
   // setVideos,
   // setPopularMovies,
    //setReviews,
    //setSimilarMovies,
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

 
  const trailerUrl = `https://www.youtube.com/embed/${selectedTrailers[0]?.key}`;




  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ m: 2 }}>
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
