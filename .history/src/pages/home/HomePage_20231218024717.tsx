import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { Grid, Pagination } from "@mui/material";
import Search from "../../components/Search";
import { useSelector } from "react-redux";
import {
  getAdvencedFilterData,
  getBasicFilterData,
} from "../../redux/selector";
import { fetchAdvancedData, fetchBasicData } from "../../services/api";

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
};

export const HomePage = () => {
  const advancedFilterSelector = useSelector(getAdvencedFilterData);
  const basicFilterSelector = useSelector(getBasicFilterData);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [results, setResults] = useState<Array<MovieItem>>([]);

  const [lastExecutedEffect, setLastExecutedEffect] = useState<string | null>(
    null
  );
  const [basicFilterPageTrigger, setBasicFilterPageTrigger] =
    useState<boolean>(true);
  const [advancedFilterPageTrigger, setAdvancedFilterPageTrigger] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBasicData(basicFilterSelector, currentPage);
        setTotalPage(response?.total_pages);
        setResults(response.results);
        setLastExecutedEffect("basic");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [basicFilterSelector, basicFilterPageTrigger]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdvancedData(
          advancedFilterSelector,
          currentPage
        );
        setTotalPage(response?.total_pages);
        setResults(response.results);
        setLastExecutedEffect("advanced");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [advancedFilterSelector, advancedFilterPageTrigger]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);

    if (lastExecutedEffect === "basic") {
      setBasicFilterPageTrigger(!basicFilterPageTrigger);
    } else if (lastExecutedEffect === "advanced") {
      setAdvancedFilterPageTrigger(!advancedFilterPageTrigger);
    }
  };


  const handleFavoriteClick = (movie: MovieItem) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyFavorite = favorites.some(
      (fav: MovieItem) => fav.id === movie.id
    );

    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (fav: MovieItem) => fav.id !== movie.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    setResults((prevResults) =>
      prevResults.map((prevMovie) =>
        prevMovie.id === movie.id
          ? { ...prevMovie, isFavorite: !isAlreadyFavorite }
          : prevMovie
      )
    );
  };

  return (
    <Grid
    container
    direction={"column"}
    sx={{ justifyContent: "center", alignItems: "center" }}
  >
    <Grid
      container
      spacing={1}
      sx={{ m: theme => theme.spacing(3), justifyContent: "center", alignItems: "center" }}
    >
      <Grid item xs={12}>
        <Search />
      </Grid>
      {results.map((movie: MovieItem) => (
        <Grid item key={movie.id} xs={12} sm={6} md={3} lg={3} xl={3} sx={{ ml: theme => theme.spacing(2), justifyContent: "center", alignItems: "center" }}>
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
    <Grid
      item
      xs={12}
      sx={{ mt: theme => theme.spacing(3), justifyContent: "center", alignItems: "center" }}
    >
      <Pagination
        variant="outlined"
        color="standard"
        count={totalPage}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ mt: theme => theme.spacing(3), justifyContent: "center", alignItems: "center" }}
      />
    </Grid>
  </Grid>
  
  );
};
