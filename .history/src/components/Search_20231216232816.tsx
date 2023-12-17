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
import { Grid, Paper, Stack } from "@mui/material";
import axios from "axios";

interface AdvancedFilter {
    sort_by: string;
    include_adult: boolean;
    primary_release_year: number;
    language: string;
    with_genres: string;
    vote_average: {
      gte: number;
      lte: number;
    };
  }

const Search = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [advancedFilter, setAdvancedFilter] = useState<AdvancedFilter>({
      sort_by: 'popularity.desc',
      include_adult: false,
      primary_release_year: 0,
      language: 'en-US',
      with_genres: '',
      vote_average: {
        gte: 0,
        lte: 10,
      },
    });
  
    const handleDialogOpen = () => {
      setOpenDialog(true);
    };
  
    const handleDialogClose = () => {
      setOpenDialog(false);
    };
  
    const handleSortByChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      setAdvancedFilter((prevFilter) => ({ ...prevFilter, sort_by: e.target.value as string }));
    };
  
    const handleIncludeAdultChange = () => {
      setAdvancedFilter((prevFilter) => ({ ...prevFilter, include_adult: !prevFilter.include_adult }));
    };
  
    const handleReleaseYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAdvancedFilter((prevFilter) => ({ ...prevFilter, primary_release_year: parseInt(e.target.value, 10) }));
    };
  
    const handleLanguageChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      setAdvancedFilter((prevFilter) => ({ ...prevFilter, language: e.target.value as string }));
    };
  
    const handleGenreChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      setAdvancedFilter((prevFilter) => ({ ...prevFilter, with_genres: e.target.value as string }));
    };
  
    const handleRatingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      setAdvancedFilter((prevFilter) => ({ 
        ...prevFilter, 
        vote_average: { 
          ...prevFilter.vote_average, 
          gte: 0,  // Değiştirilebilir
          lte: e.target.value as number 
        }
      }));
    };
  
    const handleAdvancedFilterApply = () => {
      // Burada API çağrısı yapılabilir.
      console.log(advancedFilter);
      handleDialogClose();
    };



    /// türler

    const[genreList, setGenreList]=useState()

    useEffect( ()=>{
        const fetchData = async () => {
            try {
      
        const apiKey = "ab517a924bb34407923d1e5fab7eccbd";

        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
          {params: {language: 'en'}}
        
        
          );
        
        console.log("genreLİST -*-*", genreResponse);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
    },[])

  return (
   
    <Paper elevation={3} sx={{ mr: 3, p: 2 }}>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          label="fullWidth"
          id="fullWidth"
          variant="filled"
          color="warning"
        />
        <Button
          variant="contained"
          color="inherit"
          onClick={handleDialogOpen}
          sx={{  }}
        >
          Advanced Filtering
        </Button>
      </Stack>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Gelişmiş Filtreleme</DialogTitle>
        <DialogContent>
        <Stack direction="column" gap={1} spacing={2}>
          <Select
            label="Sıralama Tipi"
            value={advancedFilter.sort_by}
            onChange={()=>handleSortByChange}
            fullWidth
          >
            <MenuItem value="popularity.desc">Popülerlik Azalan</MenuItem>
            <MenuItem value="vote_average.desc">Oylama Azalan</MenuItem>
            {/* Diğer seçenekler */}
          </Select>

          <div>
            <label>Yetişkin İçerik</label>
            <input type="checkbox" checked={advancedFilter.include_adult} onChange={handleIncludeAdultChange} />
          </div>

          <TextField
            label="Yayın Yılı"
            variant="outlined"
            fullWidth
            value={advancedFilter.primary_release_year}
            onChange={handleReleaseYearChange}
          />

          <Select
            label="Dil"
            value={advancedFilter.language}
            onChange={()=>handleLanguageChange}
            fullWidth
          >
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="tr-TR">Türkçe</MenuItem>
            <MenuItem value="es-ES">Español</MenuItem>
            <MenuItem value="fr-FR">Français</MenuItem>
            <MenuItem value="de-DE">Deutsch</MenuItem>
            <MenuItem value="it-IT">Italiano</MenuItem>
          </Select>

          <Select
            label="Tür"
            value={advancedFilter.with_genres}
            onChange={()=>handleGenreChange}
            fullWidth
          >
            <MenuItem value="28">Aksiyon</MenuItem>
            <MenuItem value="35">Komedi</MenuItem>
            {/* Diğer seçenekler */}
          </Select>

          <TextField
            label="Rating"
            variant="outlined"
            type="number"
            fullWidth
            value={advancedFilter.vote_average.lte}
            onChange={handleRatingChange}
          />
          </Stack>
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
