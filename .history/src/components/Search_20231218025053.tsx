import React, { useEffect, useState } from "react";
import {
  Select,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  Stack,
  InputAdornment
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  commitAdvencedFilterData,
  commitBasicFilterData,
} from "../redux/slice/movieSlice";
import { fetchGenres } from "../services/api";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";

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

const Search = () => {
  const dispatch = useDispatch();

  const [genreList, setGenreList] = useState<Array<GenreType>>();

  const [genre, setGenre] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [language, setLanguage] = useState<string>("en-US");
  const [adult, setAdult] = useState<boolean>(true);
  const [ratingValue, setRatingValue] = useState<number | "">("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  const [openDialog, setOpenDialog] = useState(false);

  const isRatingError =
    ratingValue !== "" && (ratingValue < 1 || ratingValue > 10);

  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 50; year--) {
    years.push(year);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreList = await fetchGenres();
        setGenreList(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchData();
  }, []);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRatingValue(newValue === "" ? "" : parseInt(newValue, 10));
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setGenre("");
    setSortBy("popularity.desc");
    setLanguage("en-US");
    setAdult(true);
    setRatingValue("");
    setSelectedYear("");
  };

  const handleAdvancedFilterApply = () => {
    const advancedFilter: AdvancedFilter = {
      sort_by: sortBy,
      include_adult: adult,
      primary_release_year: selectedYear as number,
      language: language,
      with_genres: genre?.toString(),
      vote_average: {
        gte: 0,
        lte: ratingValue as number,
      },
    };

    dispatch(commitAdvencedFilterData(advancedFilter));
    handleDialogClose();
  };

  const handleTextFilters = (text: string) => {
    if (text.trim() !== "" && text.length >= 2) {
      dispatch(commitBasicFilterData(text));
    } else handleAdvancedFilterApply();
  };

  return (
    <Paper elevation={3} sx={{ mr: 3, p: 2, width: "100%", maxWidth: "800px", margin: "auto" }}>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} >
      <TextField
        fullWidth
        label="Arama"
        id="fullWidth"
        variant="filled"
        color="warning"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ fontWeight: "bold" }}
        onChange={(e) => handleTextFilters(e.target.value)}
      />
      <Button
        variant="contained"
        color="inherit"
        onClick={handleDialogOpen}
        sx={{ fontWeight: "bold", mt: { xs: 1, md: 0 }, mr: { xs: 0, md: 1 } }}
        startIcon={<SettingsIcon />}
      >
        Gelişmiş Filtreleme
      </Button>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => window.location.reload()}
        sx={{ fontWeight: "bold", mt: { xs: 1, md: 0 } }}
        startIcon={<RestartAltIcon />}
      >
        Filtreleri Sıfırla
      </Button>
    </Stack>
  
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      maxWidth="md"
      fullWidth
      fullScreen={window.innerWidth < 600}
    >
      <Stack>
        <DialogTitle>Gelişmiş Filtreleme</DialogTitle>
      </Stack>
      <DialogContent>
        <Grid container direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sıralama Türü</InputLabel>
              <Select
                label="Sıralama Türü"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                fullWidth
              >
                <MenuItem value="popularity.asc">
                  Artan Popülerlik
                </MenuItem>
                <MenuItem value="popularity.desc">
                  Azalan Popülerlik
                </MenuItem>
                <MenuItem value="vote_average.asc">
                  Artan Oy Oranı
                </MenuItem>
                <MenuItem value="vote_average.desc">
                  Azalan Oy Oranı
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={adult}
                  onChange={(e) => setAdult(e.target.checked)}
                />
              }
              label="Yetişkin İçerik"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="year-select-label">Birincil Yayın Yılı</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                label="Birincil Yayın Yılı"
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
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Dil</InputLabel>
              <Select
                label="Dil"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                fullWidth
              >
                <MenuItem value="en-US">İngilizce</MenuItem>
                <MenuItem value="tr-TR">Türkçe</MenuItem>
                <MenuItem value="es-ES">İspanyolca</MenuItem>
                <MenuItem value="fr-FR">Fransızca</MenuItem>
                <MenuItem value="de-DE">Almanca</MenuItem>
                <MenuItem value="it-IT">İtalyanca</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tür</InputLabel>
              <Select
                label="Tür"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                fullWidth
              >
                {genreList?.map((genre) => (
                  <MenuItem value={genre?.id} key={genre?.id}>
                    {genre?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={isRatingError} fullWidth>
              <TextField
                label="Değer (1-10)"
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
                {isRatingError && "Değer 1 ile 10 arasında olmalıdır."}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdvancedFilterApply} color="primary">
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  </Paper>
  
  );
};

export default Search;
