import { Card, CardContent, CardMedia, Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

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


    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<VideoResultDTO | null>(
      null
    );
  
    const handleVideoClick = (video: VideoResultDTO) => {
      setSelectedVideo(video);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedVideo(null);
    };
  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <div style={{ overflowX: 'auto', display: 'flex' }}>
          {videos.slice(0, 10).map((video: VideoResultDTO, index: number) => (
            <Card
              key={video.id}
              style={{ minWidth: 150, margin: '0 8px', cursor: 'pointer' }}
              onClick={() => handleVideoClick(video)}
            >
              {/* Assuming the video key is a valid YouTube video ID */}
              <CardMedia
                component="img"
                height="220"
                // Constructing the YouTube video URL using the video key
                image={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                alt={video.name}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedVideo && (
            <iframe
            width="560"
            height="315"
              src={`https://www.youtube.com/embed/${selectedVideo.key}`}
              title={selectedVideo.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
