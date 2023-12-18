import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Rating,
  Stack,
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
  ReviewListDTO,
  MovieDTO,
} from "./movieDetailtypes";
import { fetchMovieDetails } from "../../services/api";
import { formatDate } from "../../Utils/helpers";

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

  const [movieDetails, setMovieDetails] = useState<MovieDTO>();
  const [castAndCrew, setCastAndCrew] = useState<MovieCreditsDTO | null>(null);
  const [videos, setVideos] = useState<VideoResultDTO[]>([]);

  const [reviews, setReviews] = useState<ReviewListDTO | null>(null);

  const [movieImage, setMovieImage] = useState<MovieImageList>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const movieId: number = movieDetailSelector?.movieId
      ? parseInt(movieDetailSelector?.movieId)
      : parseInt(movieIdParams?.id as never);

    const fetchData = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieImage(details.image);
        setMovieDetails(details.details);
        setCastAndCrew(details.castAndCrew);
        setVideos(details.videos);
        setReviews(details.reviews);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [movieDetailSelector]);

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
      <Grid container direction={{ xs: "column", md: "row" }} spacing={4} >
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ mr: 3, p: 2,mt:2, width: "100%", margin: "auto" }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
              <Grid xs={5}>
                <Card
                  sx={{
                    maxWidth: { xs: 250, md: 350 },
                    maxHeight: { xs: 350, md: 490 },
                    m: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="500"
                    style={{ maxWidth: "100%", height: "auto" }}
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
                      label={formatDate(movieDetails?.release_date as string)}
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
            
            {castAndCrew?.cast.length === 0 ? (
  <Typography variant="body1" align="center">
    No data found.
  </Typography>
) : (<MovieActors cast={castAndCrew?.cast as never} />)}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            
            {videos.length === 0 ? (
  <Typography variant="body1" align="center">
    No data found.
  </Typography>
) : (<MovieVideo videos={videos} />)}
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            
            {movieImage?.posters.length === 0 ? (
  <Typography variant="body1" align="center">
    No data found.
  </Typography>
) : (<MoviePoster posters={movieImage?.posters as never} />)}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
          {reviews?.results.length === 0 ? (
  <Typography variant="body1" align="center">
    No data found.
  </Typography>
) : (<MovieReview results={reviews?.results as never} />)}
            
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
