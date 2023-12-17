import React, { useState } from "react";
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

type FilterComponentProps = {
  onFilterChange: (filter: Filter) => void;
};

type Filter = {
  searchText: string;
  selectedOption: string;
  selectedDate: Date | null;
};

const Search = ({ onFilterChange }: FilterComponentProps) => {
  const [filter, setFilter] = useState<Filter>({
    searchText: "",
    selectedOption: "",
    selectedDate: null,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter) => ({ ...prevFilter, searchText: e.target.value }));
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleOptionChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      selectedOption: e.target.value as string,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFilter((prevFilter) => ({ ...prevFilter, selectedDate: date }));
  };

  const handleFilterApply = () => {
    onFilterChange(filter);
    handleDialogClose();
  };


  const [advancedFilter, setAdvancedFilter] = useState({
    field1: '',
    field2: '',
    option: '',
  });


  const handleField1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvancedFilter((prevFilter) => ({ ...prevFilter, field1: e.target.value }));
  };

  const handleField2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvancedFilter((prevFilter) => ({ ...prevFilter, field2: e.target.value }));
  };

 

  const handleAdvancedFilterApply = () => {
    // Burada gelişmiş filtreleme işlemlerini gerçekleştirebilirsiniz.
    console.log(advancedFilter);
    handleDialogClose();
  };


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
        sx={{ fontSize: 'bold' }}
      >
        Advanced Filtering
      </Button>
    </Stack>

    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>Gelişmiş Filtreleme</DialogTitle>
      <DialogContent>
        <TextField
          label="Field 1"
          variant="outlined"
          fullWidth
          value={advancedFilter.field1}
          onChange={handleField1Change}
        />
        <TextField
          label="Field 2"
          variant="outlined"
          fullWidth
          value={advancedFilter.field2}
          onChange={handleField2Change}
        />
        <Select
          label="Option"
          value={advancedFilter.option}
          onChange={()=>handleOptionChange}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seçiniz
          </MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          {/* Diğer seçenekler */}
        </Select>
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
