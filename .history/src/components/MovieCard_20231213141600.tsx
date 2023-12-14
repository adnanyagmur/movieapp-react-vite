import React from "react";
import { Box, Button, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DetailsIcon from '@mui/icons-material/Details';

type  MovieCardProps ={
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
}

function MovieCard({ title, overview, releaseDate, posterPath, voteAverage }: MovieCardProps) {
 // Sadece ilk 100 karakteri alarak overview'ı kısalt
 const shortenedOverview = overview.length > 100 ? `${overview.slice(0, 100)}...` : overview;

 
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 450, mt: 3 }}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={`https://image.tmdb.org/t/p/w500/${posterPath}`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: '3em', overflow: 'hidden' }}>
          {shortenedOverview}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Release Date: {releaseDate}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="outlined" /* onClick={onFavoriteClick}  */startIcon={<FavoriteIcon />}>
            Favorite
          </Button>
          <Button variant="contained" /* onClick={onDetailsClick}  */startIcon={<DetailsIcon />} sx={{ fontSize: '0.8rem' }}>
            Details
          </Button>
          <Rating name="movie-rating" value={voteAverage / 2} precision={0.5} readOnly />
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;