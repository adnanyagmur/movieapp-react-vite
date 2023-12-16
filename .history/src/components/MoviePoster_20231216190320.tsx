import React from 'react'



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
export default function MoviePoster({posters}:MovieImageDTO) {
  return (
    <div>MoviePoster</div>
  )
}
