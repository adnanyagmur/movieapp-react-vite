import { Card, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMovieDetails } from "../../redux/selector";



type MovieDetails= {
  movieId:string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
}

export const MovieDetails = () => {
  const movieDetailSelector = useSelector(selectMovieDetails);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const movieId: number=0

  useEffect(() => {
    setMovieDetails(movieDetailSelector) 
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "ab517a924bb34407923d1e5fab7eccbd",
              language: 'en-US',
            },
          }
        );
console.log("detail kısmı",response)

       // const { title, overview, release_date, poster_path, vote_average } = response.data;

       /*  setMovie({
          title,
          overview,
          releaseDate: release_date,
          posterPath: poster_path,
          voteAverage: vote_average,
        }); */
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieDetailSelector]);

  if (!movieDetails) {
    // Loading state or handle error
    return null;
  }

  const { title, overview, releaseDate, posterPath, voteAverage } = movieDetails;

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt={title}
            height="400"
            image={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {overview}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Release Date: {releaseDate}
            </Typography>
            <Rating name="movie-rating" value={voteAverage / 2} precision={0.5} readOnly />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
