import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DetailsIcon from "@mui/icons-material/ContentPasteSearch";
import { useDispatch } from "react-redux";
import { commitMovieDetails } from "../redux/slice/movieSlice";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Utils/helpers";

type MovieItem = {
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

type MovieCardProps = {
  movieId: string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
  onFavoriteClick: () => void;
};

function MovieCard({
  title,
  overview,
  releaseDate,
  posterPath,
  voteAverage,
  movieId,
  onFavoriteClick,
}: MovieCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const maxTitleLength = 15;
  const maxOverviewLength = 150;

  const truncatedTitle =
    title.length > maxTitleLength
      ? `${title?.slice(0, maxTitleLength)}...`
      : title;
  const truncatedOverview =
    overview.length > maxOverviewLength
      ? `${overview?.slice(0, maxOverviewLength)}...`
      : overview;

  const fetchMovieDetails = async () => {
    const movieData = {
      title,
      overview,
      releaseDate,
      posterPath,
      voteAverage,
      movieId,
    };
    dispatch(commitMovieDetails(movieData));
    navigate(`/movie-details/${movieId}`);
  };

  const isMovieInFavorites = (movieId: string): boolean => {
    const favorites = JSON.parse(localStorage?.getItem("favorites") || "[]");
    return favorites?.some((fav: MovieItem) => fav.id === parseInt(movieId, 10));
  };

  return (
    <Card sx={{ maxWidth: 250, mt: 3 }}>
      <CardActionArea onClick={() => fetchMovieDetails()}>
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Tooltip title={title} placement="top">
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {truncatedTitle}
            </Typography>
          </Tooltip>
          <Tooltip title={overview} placement="top">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxHeight: "4em",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              {truncatedOverview}
            </Typography>
          </Tooltip>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginBottom: "0.5rem" }}
          >
            Release Date: {formatDate(releaseDate)}
          </Typography>
          <Rating
            name="movie-rating"
            value={voteAverage / 2}
            precision={0.5}
            readOnly
            sx={{ marginRight: "1rem" }}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item>
            <IconButton onClick={onFavoriteClick}>
              <FavoriteIcon
                sx={{ color: isMovieInFavorites(movieId) ? "red" : "disabled" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              color="inherit"
              startIcon={<DetailsIcon />}
              sx={{ fontSize: "0.8rem" }}
              onClick={() => fetchMovieDetails()}
            >
              Details
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
