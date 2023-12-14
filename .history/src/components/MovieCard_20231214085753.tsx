import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DetailsIcon from '@mui/icons-material/ContentPasteSearch';
import axios from "axios";

type  MovieCardProps ={
  movieId:string
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
  onFavoriteClick: () => void;
}

function MovieCard({ title, overview, releaseDate, posterPath, voteAverage , movieId, onFavoriteClick}: MovieCardProps) {
 // Sadece ilk 100 karakteri alarak overview'ı kısalt
 const maxTitleLength = 15;
 const maxOverviewLength = 150;

 const truncatedTitle = title.length > maxTitleLength ? `${title.slice(0, maxTitleLength)}...` : title;
 const truncatedOverview = overview.length > maxOverviewLength ? `${overview.slice(0, maxOverviewLength)}...` : overview;




 ////////////////////

 const [movieDetails, setMovieDetails] = useState(null);


    const fetchMovieDetails = async () => {
      //const movieId = match.params.id; // React Router ile alınan movie_id

    
const response = await axios.get(
  `https://api.themoviedb.org/3/movie/${movieId}}`,
  {
    params: {
      api_key: "ab517a924bb34407923d1e5fab7eccbd",
      language: 'en-US',
    },
  }
);
console.log("detayyy", response)
    };

    

    const isFavorite = JSON.parse(localStorage.getItem('favorites') || '[]').some((fav: any) => fav.id === movieId);


  return (
    <Card sx={{ maxWidth: 250, mt: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Tooltip title={title} placement="top">
            <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {truncatedTitle}
            </Typography>
          </Tooltip>
          <Tooltip title={overview} placement="top">
            <Typography variant="body2" color="text.secondary" sx={{ maxHeight: '4em', overflow: 'hidden', marginBottom: '1rem' }}>
              {truncatedOverview}
            </Typography>
          </Tooltip>
          <Typography variant="caption" color="text.secondary" sx={{ marginBottom: '0.5rem' }}>
            Release Date: {releaseDate}
          </Typography>
          <Rating name="movie-rating"  value={voteAverage / 2} precision={0.5} readOnly sx={{ marginRight: '1rem' }} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item>
            <IconButton onClick={onFavoriteClick}>
              <FavoriteIcon sx={{color: isFavorite  ?"red": "disabled"}}  />
            </IconButton>
          </Grid>
          <Grid item>
            <Button variant="text" color="inherit"  startIcon={<DetailsIcon />} sx={{ fontSize: '0.8rem' }} onClick={()=>fetchMovieDetails()}>
              Details
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
);
};

export default MovieCard;