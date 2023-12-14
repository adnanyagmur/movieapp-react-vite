import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  makeStyles,
} from '@mui/material';



const MovieCard = ({ title, overview, posterPath, releaseDate, handleClick }) => {


  return (
    <Card >
      <CardActionArea>
        <CardMedia
          
          component="img"
          alt={title}
          height="140"
          image={`https://image.tmdb.org/t/p/w500${posterPath}`}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {overview}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {releaseDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button size="small" color="primary" onClick={handleClick}>
        Details
      </Button>
    </Card>
  );
};

export default MovieCard;