import React, { useState } from 'react';
import TextField, { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateFnsUtils from '@mui/lab/AdapterDateFns';
import { JSX } from 'react/jsx-runtime';

type FilterComponentProps ={
    onFilterChange: (filter: Filter) => void;
  }
  
  type Filter ={
    searchText: string;
    selectedOption: string;
    selectedDate: Date | null;
  }


const Search = ({ onFilterChange }: FilterComponentProps) => {
    const [filter, setFilter] = useState<Filter>({
        searchText: '',
        selectedOption: '',
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
        setFilter((prevFilter) => ({ ...prevFilter, selectedOption: e.target.value as string }));
      };
    
      const handleDateChange = (date: Date | null) => {
        setFilter((prevFilter) => ({ ...prevFilter, selectedDate: date }));
      };
    
      const handleFilterApply = () => {
        onFilterChange(filter);
        handleDialogClose();
      };
    
  return (
    <div>
    <TextField
      label="Search"
      variant="outlined"
      value={filter.searchText}
      onChange={handleSearchTextChange}
    />
    <Button variant="contained" color="primary" onClick={handleDialogOpen}>
      Detaylı Filtreleme
    </Button>

    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>Detaylı Filtreleme</DialogTitle>
      <DialogContent>
        <Select
          value={filter.selectedOption}
          onChange={()=>handleOptionChange}
          label="Option"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seçiniz
          </MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          {/* Diğer seçenekler */}
        </Select>

       
          <DatePicker
            label="Tarih Seçimi"
            value={filter.selectedDate}
            onChange={handleDateChange}
            renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} variant="outlined" />}
          />
      
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          İptal
        </Button>
        <Button onClick={handleFilterApply} color="primary">
          Filtrele
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
};

export default Search;
