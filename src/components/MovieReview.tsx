import { Avatar, Card, CardContent, Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'
import { formatDate } from '../Utils/helpers';

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
    results: MovieReview[]
  }
export const MovieReview = ({results}:MovieReviewList) => {


console.log("gelen review", results)

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReview, setSelectedReview] = useState<MovieReview | null>(null);
  
    const handleReviewClick = (results: MovieReview) => {
      setSelectedReview(results);
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
            {results?.map((review: MovieReview, index: number) => (
              <Card
                key={index}
                style={{
                  minWidth: 300, // Kartın genişliği
                  margin: '0 8px',
                  cursor: 'pointer',
                }}
                onClick={() => handleReviewClick(review)}
              >
                <CardContent>
                <Typography variant="subtitle2">
                  <Avatar alt={review.author} src={`https://image.tmdb.org/t/p/w92${review.author_details.avatar_path}`} />
                  {` Author: ${review.author}`}
                </Typography>        
                <Typography variant="body2">{`Created at: ${formatDate(review?.created_at)}`}</Typography>
                <Typography variant="body2">{`Content: ${review.content.substring(0, 200)}`}...</Typography>
                <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                  Devamını Oku
                </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Paper>
  
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {selectedReview && (
              <div>
                <Typography variant="subtitle2">{`Author: ${selectedReview?.author}`}</Typography>
                <Typography variant="body2">{`Created at: ${selectedReview?.created_at}`}</Typography>
                <Typography variant="body2">{`Content: ${selectedReview?.content}`}</Typography>
                <a href={selectedReview?.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    );
}
