import React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DetailsIcon from '@mui/icons-material/ContentPasteSearch';

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

 const shortenedOverview = overview.length + titleLength > 100 ?(titleLength >20  ? `${overview.slice(0, 100-(titleLength*3))}...` : `${overview.slice(0, 100-(titleLength))}...`) : overview;

 
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 350, mt: 3, display: 'flex', flexDirection: 'column',  }}>
      <CardActionArea>
    <CardMedia
      component="img"
      alt={title}
      height="200"
      image={`https://image.tmdb.org/t/p/w500/${posterPath}`}
    />
    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxHeight: '4em', overflow: 'hidden', marginBottom: '1rem' }}>
        {shortenedOverview}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ marginBottom: '0.5rem' }}>
        Release Date: {releaseDate}
      </Typography>
      <Rating name="movie-rating" value={voteAverage / 2} precision={0.5} readOnly sx={{ marginRight: '1rem' }} />
      </CardContent>
      </CardActionArea>
      <CardActions>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
       
        <IconButton >
        <FavoriteIcon />
        </IconButton>
        <Button variant="text"  startIcon={<DetailsIcon />} sx={{ fontSize: '0.8rem' }}>
          Details
        </Button>
       
      </Box>
      </CardActions>
  </Card>

  );
}

export default MovieCard;