import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type  MovieCardProps ={
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
}

function MovieCard({ title, overview, releaseDate, posterPath, voteAverage }: MovieCardProps) {
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 350, m:3}}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={`https://image.tmdb.org/t/p/w500/${posterPath}`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Release Date: {releaseDate}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Vote Average: {voteAverage}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;