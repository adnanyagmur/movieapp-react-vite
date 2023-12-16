import { Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

type CastMemberDTO = {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  };

  export default function MovieActors(cast:CastMemberDTO[] |null) {

 

   

  return (
    <Grid item xs={12}>
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <div style={{ overflowX: "auto", display: "flex" }}>
        {cast.slice(0, 10).map((member:CastMemberDTO, index:number) => (
          <Card
            key={member.id}
            style={{ minWidth: 150, margin: "0 8px" }}
          >
            <CardMedia
              component="img"
              height="220"
              image={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
              alt={member.name}
            />
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "cursive" }}
              >
                {member.name}
              </Typography>
              <Typography variant="body2">{member.character}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Paper>
  </Grid>
  )
}



