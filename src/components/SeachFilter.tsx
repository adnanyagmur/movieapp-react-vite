import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FilterProps {
  onSearch: (query: string) => void;
}


export const SeachFilter = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const handleDetailedSearch = () => {
      // Implement detailed search logic here
      console.log('Performing detailed search');
    };
  

  return (
    <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="search-panel">
      <Typography variant="h6">Search</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {/* Additional detailed search fields can be added here */}
      <button onClick={handleDetailedSearch}>Detailed Search</button>
    </AccordionDetails>
  </Accordion>
  )
}
