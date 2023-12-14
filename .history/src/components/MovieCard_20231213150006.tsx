import React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Tooltip, Typography } from "@mui/material";
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
 const maxTitleLength = 30;
 const maxOverviewLength = 150;

 const truncatedTitle = title.length > maxTitleLength ? `${title.slice(0, maxTitleLength)}...` : title;
 const truncatedOverview = overview.length > maxOverviewLength ? `${overview.slice(0, maxOverviewLength)}...` : overview;

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
        <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {truncatedTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: '4em', overflow: 'hidden', marginBottom: '1rem' }}>
          {truncatedOverview}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ marginBottom: '0.5rem' }}>
          Release Date: {releaseDate}
        </Typography>
        <Rating name="movie-rating" value={voteAverage / 2} precision={0.5} readOnly sx={{ marginRight: '1rem' }} />
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <Grid item>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Tooltip title={overview}>
            <Button variant="text" startIcon={<DetailsIcon />} sx={{ fontSize: '0.8rem' }}>
              Details
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
);
};

export default MovieCard;