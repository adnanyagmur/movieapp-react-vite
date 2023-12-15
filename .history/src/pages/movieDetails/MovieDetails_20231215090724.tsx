import { Button, Card, CardContent, CardMedia, Dialog, DialogContent, Grid, Rating, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMovieDetails } from "../../redux/selector";

interface Movie {
  title: string;
  tagline: string;
  overview: string;
  trailerUrl: string;
  cast: string[];
  crew: string[];
  media: string[];
  posterPath: string;
}

const mockMovie: Movie = {
  title: 'Inception',
  tagline: 'Your mind is the scene of the crime',
  overview:
    "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within a person's subconscious during the dream state.",
  trailerUrl: 'https://www.youtube.com/embed/8hP9D6kZseM',
  cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
  crew: ['Christopher Nolan', 'Hans Zimmer'],
  media: ['https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'],
  posterPath: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
};


type MovieDetails= {
  movieId:string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
}




/////////////////////////////typelar///////
//detayalr

type MovieDTO = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any; // null veya bir nesne olarak tanımlanabilir
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {english_name:string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

//////
type MoviePopulerDTO = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

type MovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

/////yorumlar

type ReviewDTO = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

type ReviewListDTO ={
  id:number;
  page:number;
  results:ReviewDTO[];
  total_pages:number;
  total_results:number;
} 

///benzer içerik

type MovieBenzerIcerikDTO = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieListDTO = {
  id:number;
  page:number;
  results:MovieDTO[];
  total_pages:number;
  total_results:number;
}

// videos


export const MovieDetails = () => {
  const movieDetailSelector = useSelector(selectMovieDetails);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const movieId: number=0

  useEffect(() => {
    setMovieDetails(movieDetailSelector) 
    const movieId = movieDetailSelector?.movieId
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "ab517a924bb34407923d1e5fab7eccbd",
              language: 'en-US',
            },
          }
        );
console.log("detail kısmı",response)


const apiKey = "ab517a924bb34407923d1e5fab7eccbd";

// Film detaylarını almak için ilk istek cast and crew
axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
  .then(res => {
    //const cast = response.data.credits.cast;
console.log("cast", res)
    // Oyuncuları set et
   
  })

  // Film detaylarını almak için ilk istek
axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
.then(res => {
  //const cast = response.data.credits.cast;
console.log("videos", res)
  // Oyuncuları set et
 
})

axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
.then(res => {
  //const cast = response.data.credits.cast;
console.log("popular", res)
  // Oyuncuları set et
 
})

axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`)
.then(res => {
  //const cast = response.data.credits.cast;
console.log("yorumlar", res)
  // Oyuncuları set et
 
})

axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`)
.then(res => {
  //const cast = response.data.credits.cast;
console.log("benzer içerikler", res)
  // Oyuncuları set et
 
})

       // const { title, overview, release_date, poster_path, vote_average } = response.data;

       /*  setMovie({
          title,
          overview,
          releaseDate: release_date,
          posterPath: poster_path,
          voteAverage: vote_average,
        }); */
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieDetailSelector]);

 /*  if (!movieDetails) {
    // Loading state or handle error
    return null;
  } */

  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);

  const handleOpenTrailerDialog = () => {
    setOpenTrailerDialog(true);
  };

  const handleCloseTrailerDialog = () => {
    setOpenTrailerDialog(false);
  };

  const steps = ['Overview', 'Media', 'Cast', 'Crew'];

  const renderStepContent = (step: string) => {
    switch (step) {
      case 'Overview':
        return <Typography>{mockMovie.overview}</Typography>;
      case 'Media':
        return <img src={mockMovie.media[0]} alt="Media" style={{ width: '100%' }} />;
      case 'Cast':
        return <Typography>{mockMovie.cast.join(', ')}</Typography>;
      case 'Crew':
        return <Typography>{mockMovie.crew.join(', ')}</Typography>;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <img src={`https://image.tmdb.org/t/p/w500/${mockMovie.posterPath}`} alt={mockMovie.title} style={{ width: '100%' }} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {mockMovie.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {mockMovie.tagline}
            </Typography>
            <Button variant="outlined" onClick={handleOpenTrailerDialog}>
              Watch Trailer
            </Button>
            <Dialog open={openTrailerDialog} onClose={handleCloseTrailerDialog}>
              <DialogContent>
                <iframe title="Trailer" width="560" height="315" src={mockMovie.trailerUrl} allowFullScreen />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        {renderStepContent(steps[0])}
      </Grid>
    </Grid>
  );
}
