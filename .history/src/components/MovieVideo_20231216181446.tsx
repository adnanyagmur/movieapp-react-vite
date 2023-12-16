import { Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

type VideoResultDTO = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  };
  
  type VideoPageDTO = {
    videos: VideoResultDTO[];
  };

export default function MovieVideo({ videos }:VideoPageDTO) {
  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <div style={{ overflowX: 'auto', display: 'flex' }}>
          {videos.slice(0, 10).map((video: VideoResultDTO, index: number) => (
            <Card key={video.id} style={{ minWidth: 150, margin: '0 8px' }}>
              {/* Assuming the video key is a valid YouTube video ID */}
              <CardMedia
                component="iframe"
                height="300"
                // Constructing the YouTube video URL using the video key
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontFamily: 'cursive' }}>
                  {video.name}
                </Typography>
                <Typography variant="body2">{video.type}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Paper>
    </Grid>
  )
}
