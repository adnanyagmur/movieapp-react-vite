import React from 'react'

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
  return (
    <div>MovieReview</div>
  )
}
