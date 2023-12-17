import React, { useEffect, useState } from "react";
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateFnsUtils from "@mui/lab/AdapterDateFns";
import { JSX } from "react/jsx-runtime";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";

type AdvancedFilter = {
  sort_by: string;
  include_adult: boolean;
  primary_release_year: number;
  language: string;
  with_genres: string;
  vote_average: {
    gte: number;
    lte: number;
  };
};

type GenreType = {
  id: number;
  name: string;
};

/* type YearSelectProps = {
    onSelect: (selectedYear: number) => void;
  } */

const Search = () => {
  const [genreList, setGenreList] = useState<Array<GenreType>>();
  const [genre, setGenre] = useState<string>();
  const [sortBy, setSortBy] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [adult, setAdult] = useState<boolean>(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | "">("");
  const isRatingError =
    ratingValue !== "" && (ratingValue < 1 || ratingValue > 10);

  const [selectedYear, setSelectedYear] = useState<number | "">("");

  // Yıl dizisi oluştur
  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 50; year--) {
    years.push(year);
  }

  /*   const [advancedFilter, setAdvancedFilter] = useState<AdvancedFilter>({
    sort_by: "popularity.desc",
    include_adult: false,
    primary_release_year: 0,
    language: "en-US",
    with_genres: "",
    vote_average: {
      gte: 0,
      lte: 10,
    },
  }); */

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSortByChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  /*  const handleIncludeAdultChange = () => {
    setAdvancedFilter((prevFilter) => ({
      ...prevFilter,
      include_adult: !prevFilter.include_adult,
    }));
  }; */

  /*  const handleLanguageChange = (selectedLanguage:string) => {
    setLanguage(selectedLanguage)
  }; */

  /*   const handleGenreChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setAdvancedFilter((prevFilter) => ({
      ...prevFilter,
      with_genres: e.target.value as string,
    }));
  }; */

  const handleAdvancedFilterApply = () => {
    // Burada API çağrısı yapılabilir.
    //console.log(advancedFilter);
    handleDialogClose();
  };

  /// türler

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "ab517a924bb34407923d1e5fab7eccbd";

        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
          { params: { language: "en" } }
        );

        setGenreList(genreResponse?.data?.genres);

        console.log("genreLİST -*-*", genreResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRatingValue(newValue === "" ? "" : parseInt(newValue, 10));
  };

  console.log("year", selectedYear);
  console.log("genre", genre);
  console.log("rating", ratingValue);
  console.log("sortBy", sortBy);
  console.log("adult", adult);
  console.log("language", language);

  //console.log("ADVACED", advancedFilter)

  return (
    <Paper elevation={3} sx={{ mr: 3, p: 2 }}>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          variant="filled"
          color="warning"
        />
        <Button
          variant="contained"
          color="inherit"
          onClick={handleDialogOpen}
          sx={{}}
        >
          Advanced Filtering
        </Button>
      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <Stack>
          <DialogTitle>Advanced Filtering</DialogTitle>
        </Stack>
        <DialogContent>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Sorting Type</InputLabel>
                <Select
                  label="Sorting Type"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="popularity.asc">
                    Increasing Popularity
                  </MenuItem>
                  <MenuItem value="popularity.desc">
                    Decreasing Popularity
                  </MenuItem>
                  <MenuItem value="vote_average.asc">
                    Increasing Rating
                  </MenuItem>
                  <MenuItem value="vote_average.desc">
                    Decreasing Rating
                  </MenuItem>
                  {/* Diğer seçenekler */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adult}
                    onChange={(e) => setAdult(e.target.checked)}
                  />
                }
                label="Adult Content"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="year-select-label">Yayın Yılı</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Yayın Yılı"
                  onChange={(e) => setSelectedYear(e.target.value as number)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  label="Genre"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="en-US">English</MenuItem>
                  <MenuItem value="tr-TR">Türkçe</MenuItem>
                  <MenuItem value="es-ES">Español</MenuItem>
                  <MenuItem value="fr-FR">Français</MenuItem>
                  <MenuItem value="de-DE">Deutsch</MenuItem>
                  <MenuItem value="it-IT">Italiano</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select
                  label="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  fullWidth
                >
                  {genreList?.map((genre) => (
                    <MenuItem value={genre?.id}>{genre?.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl error={isRatingError} fullWidth>
                <TextField
                  label="Value (1-10)"
                  value={ratingValue}
                  onChange={handleRatingChange}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 1,
                      max: 10,
                    },
                  }}
                />
                <FormHelperText>
                  {isRatingError && "The value must be between 1 and 10."}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            İptal
          </Button>
          <Button onClick={handleAdvancedFilterApply} color="primary">
            Filtrele
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Search;
