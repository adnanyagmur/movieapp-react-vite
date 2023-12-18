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

  return (
   
        <Paper elevation={3}
        sx={{
         mr:3,
          p:2,
         
        }}>
      <Stack direction="row" spacing={1}>
        
      <TextField fullWidth label="fullWidth" id="fullWidth" variant="filled" color="warning"/>
       
          <Button variant="contained" color="inherit" sx={{fontSize:"bold"}}>
            Detaylı Filtreleme
          </Button>
     
      </Stack>
      </Paper>
    
  );
};

export default Search;