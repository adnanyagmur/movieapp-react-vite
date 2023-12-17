import  { useEffect, useState } from 'react';
//import { getPopularMovies } from '../../services/moviesApi'
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import { Grid, Pagination, Stack } from '@mui/material';
import { SeachFilter } from '../../components/SeachFilter';
import Search from '../../components/Search';
import { useSelector } from 'react-redux';
import { getAdvencedFilterData, getBasicFilterData } from '../../redux/selector';



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

  const advancedFilterSelector = useSelector(getAdvencedFilterData)
  const basicFilterSelector = useSelector(getBasicFilterData)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>()

  //const [movies, setMovies] = useState<ApiResponse>();
  const [results, setResults] = useState<Array<MovieItem>>([])

  const [lastExecutedEffect, setLastExecutedEffect] = useState<string | null>(null);
  const [basicFilterPageTrigger, setBasicFilterPageTrigger] = useState<boolean>(true)
  const [advancedFilterPageTrigger, setAdvancedFilterPageTrigger] = useState<boolean>(true)


  useEffect(() => {
   
    console.log("BASİC SELECTOR USEEFFECT",basicFilterSelector)
    const fetchData = async () => {
      try {
      const response: ApiResponse = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: "ae304e3f4d3830d95075ae6914b55ddf",
            query: basicFilterSelector,
            include_adult: 'false', 
            language: 'en-US', 
            page: currentPage}, 
          headers: {accept: 'application/json'},
        }
      );
      setTotalPage(response?.data?.total_pages)
      setResults(response.data.results)
      console.log("asdasdasdasdasd", response)

      setLastExecutedEffect("basic")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchData();
     
   }, [basicFilterSelector,basicFilterPageTrigger]);

   useEffect(() => {
   
    console.log("ADVANCED SELECTOR USE EFECT",advancedFilterSelector)
    const fetchData = async () => {
    try {
    const response: ApiResponse = await axios.get(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: {
          api_key: "ae304e3f4d3830d95075ae6914b55ddf",
          include_adult: advancedFilterSelector.include_adult,
          include_video: 'false',
          language: advancedFilterSelector.language,
          primary_release_year: advancedFilterSelector.primary_release_year,
          sort_by: advancedFilterSelector.sort_by,
          'vote_average.gte': advancedFilterSelector.vote_average.gte,
          'vote_average.lte': advancedFilterSelector.vote_average.lte,
          with_genres: advancedFilterSelector.with_genres,
          page: currentPage,
        },
        headers: {accept: 'application/json'},
      }
    );
    setTotalPage(response?.data?.total_pages)
    setResults(response.data.results)
    console.log("asdasdasdasdasd", response)
    setLastExecutedEffect("advanced")
 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
     
   }, [advancedFilterSelector,advancedFilterPageTrigger]);

const handleChangePage = ( event: React.ChangeEvent<unknown>, newPage: number) => {
    console.log("event",event)
    console.log("event",newPage)
  setCurrentPage(newPage);

  if (lastExecutedEffect === 'basic') {
    // Handle basic case
    setBasicFilterPageTrigger(!basicFilterPageTrigger)
  } else if (lastExecutedEffect === 'advanced') {
    // Handle advanced case
    setAdvancedFilterPageTrigger(!advancedFilterPageTrigger)
  }
  };

/* 
  useEffect(() => {
   // console.log("asdasdasdasdasd", process.env.REACT_APP_TMDB_API_KEY)
    const fetchData = async () => {
      try {


        const apiKey = "ab517a924bb34407923d1e5fab7eccbd";

        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
          {params: {language: 'en'}}
        
        
          );
        
        console.log("genreLİST -*-*", genreResponse);

        const languagesResponse = await axios.get(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`,
          {params: {language: 'en',sort_by: 'popularity.asc'}}
        
        
          );
        
        console.log("LanguageLİST -*-*", languagesResponse);



        const response: ApiResponse = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: "ae304e3f4d3830d95075ae6914b55ddf",
              language: 'en-US',
              sort_by: 'popularity.desc',
              include_adult: false,
              include_video: false,
             with_genres: '',
             primary_release_year: '',
          /*    vote_average: {
              gte: 2.0,
              lte: 3.0,
            }, */
            // with_keywords: 'Birds%20of%20Prey',
          //   page: currentPage,
             
    //        },
  //        }
  //      );
     //   setTotalPage(response?.data?.total_pages)
       // setMovies(response?.data);
  //      setResults(response.data.results)
 //       console.log("asdasdasdasdasd", response)
  //    } catch (error) {
  //      console.error('Error fetching data:', error);
  //    }
  //  };

 //  fetchData();
 // }, [currentPage]); */


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


/*   const handleChangePage = ( event: React.ChangeEvent<unknown>, newPage: number) => {
    console.log("event",event)
    console.log("event",newPage)
  setCurrentPage(newPage);
  }; */


/*   /////search
  type Filter ={
    searchText: string;
    selectedOption: string;
    selectedDate: Date | null;
  }

  const mockFilterData: Filter = {
    searchText: 'Aranacak Metin',
    selectedOption: 'option1',
    selectedDate: new Date(),
  };

  const handleFilterChange = (filter: Filter) => {
    // Burada filtre değiştiğinde yapılacak işlemleri ekleyebilirsiniz
    console.log('Yeni Filtre:', filter);
  }; */

  return (
    <Stack direction={"column"} sx={{justifyContent:"center"}}>
      <Grid>
    <Grid container spacing={1} sx={{m:3, justifyContent:"center", justifyItems:"center"}}>
<Grid item xs={12}>
      <Search/>
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
             onFavoriteClick={() => handleFavoriteClick(movie)}      
              />
       
        </Grid>
      ))}




    </Grid>
   <Grid xs={12}>
<Pagination
variant="outlined" color="standard"
        count={totalPage} // Toplam sayfa sayısı, API'den alınan verilere bağlı olarak güncellenmelidir
        page={currentPage}
        onChange={handleChangePage}
        sx={{mt:3, justifyContent:"center", justifyItems:"center", alignItems:"center"}}
      />
   </Grid>
   </Grid>
    </Stack>
  )
}

