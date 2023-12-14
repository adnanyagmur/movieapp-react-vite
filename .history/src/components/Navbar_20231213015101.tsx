import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  InputBase,
  alpha,
  Button,
  Switch,
  Grid,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/ContentPasteSearchSharp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


function Navbar() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [darkMode, setDarkMode] = useState(theme.palette.type === 'dark');
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const toggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    };

    return (
        <AppBar position="static" color={theme.palette.mode === 'light' ? 'default' : 'primary'}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
          
            <Grid item>
               <Stack direction="row" spacing={2}>
               <LocalShippingIcon />
               <Typography variant="h6">TIRPORT Movie App</Typography>
               </Stack>
              
            </Grid>
            <Grid item>
            
            <Stack direction="row" spacing={2}>
                  <SearchIcon style={{ marginRight: '5px', mt:'5px' }} />
                  <InputBase
                    placeholder="Ara..."
                    style={{ color: 'inherit', flexGrow: 1, width: '100%' }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
              
              </Stack>
            </Grid>
            <Grid item>
       
          
        <Button color="inherit" onClick={handleMenuOpen}>
              Ana Sayfa
            </Button>
            <Button color="inherit" onClick={handleMenuOpen}>
              Favori Filmler
            </Button>
            <Button color="inherit" onClick={handleMenuOpen}>
              Ayarlar
            </Button>
            
            <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="default"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
            icon={<Brightness4Icon sx={{ color: '#000', }}/>}
            checkedIcon={<Brightness7Icon sx={{ color: '#FFB534', }}  />}
            sx={{
                '& .MuiSwitch-thumb': {
                  width: '24px',
                  height: '24px',
                  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                },
                '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                  backgroundColor: 'transparent', // Arkadaki yatay alanın rengini transparent (görünmez) yapar
                  opacity: 0,
                },
                mb: "2px"
              }}

          />

          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
);
}

export default Navbar;
