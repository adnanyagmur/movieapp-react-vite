import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';

type MovieImageDetails = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type MovieImageDTO = {
  posters: MovieImageDetails[];
};

export default function MoviePoster({ posters }: MovieImageDTO) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MovieImageDetails | null>(null);

  const handleImageClick = (image: MovieImageDetails) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <div style={{ overflowX: 'auto', display: 'flex' }}>
          {posters.map((image: MovieImageDetails, index: number) => (
            <Card
              key={index}
              style={{
                width: 250, // Kartın genişliği
                margin: '0 8px',
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(image)}
            >
              <CardMedia
                component="img"
                height="150" // Resmin yüksekliği
                src={`https://image.tmdb.org/t/p/w500${image?.file_path}`}
                alt={`Poster ${index + 1}`}
              />
              <CardContent>
                <Tooltip title={`Vote Average: ${image?.vote_average}`} arrow>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: 'cursive',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {`Vote Average: ${image.vote_average}`}
                  </Typography>
                </Tooltip>
                <Typography variant="body2">{`Vote Count: ${image?.vote_count}`}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedImage && (
            <img
              style={{ width: '100%', height: 'auto' }}
              src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
              alt={`Poster ${selectedImage.file_path}`}
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
