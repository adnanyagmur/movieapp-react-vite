import React from "react";
import { Box, Button, Card, CardContent, CardMedia, IconButton, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

type  MovieCardProps ={
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
}

function MovieCard({ title, overview, releaseDate, posterPath, voteAverage }: MovieCardProps) {
 // Sadece ilk 100 karakteri alarak overview'ı kısalt
const titleLength = title.length

 const shortenedOverview = overview.length + titleLength > 100 ? `${overview.slice(0, 100-titleLength)}...` : overview;

 
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 400, mt: 3 }}>
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
        <Rating name="movie-rating" value={voteAverage / 2} precision={0.5} readOnly />
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <IconButton  /* onClick={onFavoriteClick}  */ >
          <FavoriteIcon />
          </IconButton>

          
       
          <Button variant="text" /* onClick={onDetailsClick}  */startIcon={ <ContentPasteSearchIcon />} sx={{ fontSize: '0.8rem' }}>
            Details
          </Button>
          
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;