import  { useEffect, useState } from 'react';
//import { getPopularMovies } from '../../services/moviesApi'
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import { Grid, Pagination, Stack } from '@mui/material';
import { SeachFilter } from '../../components/SeachFilter';



type MovieItem = {
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
}

type ApiResponse = {
  data: {
    page: number;
    results: MovieItem[];
    total_pages: number;
    total_results: number;
  };
}

export const HomePage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>()



  //const [movies, setMovies] = useState<ApiResponse>();
  const [results, setResults] = useState<Array<MovieItem>>([])

  useEffect(() => {
   // console.log("asdasdasdasdasd", process.env.REACT_APP_TMDB_API_KEY)
    const fetchData = async () => {
      try {
        const response: ApiResponse = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: "ae304e3f4d3830d95075ae6914b55ddf",
              language: 'en-US',
              sort_by: 'popularity.desc',
              include_adult: false,
              include_video: false,
             with_genres: 'Crime',
             page: currentPage,
             
            },
          }
        );
        setTotalPage(response?.data?.total_pages)
       // setMovies(response?.data);
        setResults(response.data.results)
        console.log("asdasdasdasdasd", response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);
  console.log("envvv*/**/*", import.meta.env.VITE_APP_TMDB_API_KEY)

  const handleFavoriteClick = (movie: MovieItem) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isAlreadyFavorite = favorites.some((fav: MovieItem) => fav.id === movie.id);

    if (isAlreadyFavorite) {
      // Eğer favori ise, listeden kaldır
      const updatedFavorites = favorites.filter((fav: MovieItem) => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Eğer favori değilse, listeye ekle
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    // Results state'ini güncelle
    setResults((prevResults) =>
      prevResults.map((prevMovie) =>
        prevMovie.id === movie.id ? { ...prevMovie, isFavorite: !isAlreadyFavorite } : prevMovie
      )
    );
  };


  const handleChangePage = ( event: React.ChangeEvent<unknown>, newPage: number) => {
    console.log("event",event)
    console.log("event",newPage)
  setCurrentPage(newPage);
  };

  return (
    <Grid container spacing={1} sx={{m:3, justifyContent:"center"}}>
<Grid item xs={12}>
      <SeachFilter />
      </Grid>
     
       {results.map((movie: MovieItem) => (
         <Grid item key={movie.id} xs={12} sm={6} md={3}>
         
        <MovieCard
             key={movie.id}
             movieId={movie.id.toString()}
             title={movie.title}
             overview={movie.overview}
             releaseDate={movie.release_date}
             posterPath={movie.poster_path}
             voteAverage={movie.vote_average}
             onFavoriteClick={() => handleFavoriteClick(movie)}       />
       
        </Grid>
      ))}


<Pagination
variant="outlined" color="standard"
        count={totalPage} // Toplam sayfa sayısı, API'den alınan verilere bağlı olarak güncellenmelidir
        page={currentPage}
        onChange={handleChangePage}
        sx={{mt:3}}
      />
  
    </Grid>
  )
}

