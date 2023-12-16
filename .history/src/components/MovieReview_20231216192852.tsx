import { Card, CardContent, Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'

type MovieReview = {
    author: string;
    author_details: {
      avatar_path: string;
      name: string;
      rating: number;
      username: string;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  };
  
  type MovieReviewList = {
    review: MovieReview[]
  }
export const MovieReview = ({review}:MovieReviewList) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReview, setSelectedReview] = useState<MovieReview | null>(null);
  
    const handleReviewClick = (review: MovieReview) => {
      setSelectedReview(review);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedReview(null);
    };
  
    return (
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2, m: 2 }}>
          <div style={{ overflowX: 'auto', display: 'flex' }}>
            {review.map((review: MovieReview, index: number) => (
              <Card
                key={index}
                style={{
                  width: 600, // Kartın genişliği
                  margin: '0 8px',
                  cursor: 'pointer',
                }}
                onClick={() => handleReviewClick(review)}
              >
                <CardContent>
                  <Typography variant="subtitle2">{`Author: ${review.author}`}</Typography>
                  <Typography variant="body2">{`Created at: ${review.created_at}`}</Typography>
                  <Typography variant="body2">{`Content: ${review.content}`}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Paper>
  
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {selectedReview && (
              <div>
                <Typography variant="subtitle2">{`Author: ${selectedReview.author}`}</Typography>
                <Typography variant="body2">{`Created at: ${selectedReview.created_at}`}</Typography>
                <Typography variant="body2">{`Content: ${selectedReview.content}`}</Typography>
                <a href={selectedReview.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    );
}
