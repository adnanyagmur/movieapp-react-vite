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
                <LocalShippingIcon />
              <Typography variant="h6">Movie App</Typography>
            </Grid>
            <Grid item>
              <div
                style={{
                  width: '150px',
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: alpha(theme.palette.common.white, 0.15),
                }}
              >
                <div style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                  <SearchIcon style={{ marginRight: '8px' }} />
                  <InputBase
                    placeholder="Ara..."
                    style={{ color: 'inherit', flexGrow: 1, width: '100%' }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item>
       
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="default"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
            icon={<Brightness4Icon sx={{ color: '#000', }}/>}
            checkedIcon={<Brightness7Icon sx={{ color: '#FFB534', }} />}
          />
        <Button color="inherit" onClick={handleMenuOpen}>
              Ana Sayfa
            </Button>
            <Button color="inherit" onClick={handleMenuOpen}>
              Favori Filmler
            </Button>
            <Button color="inherit" onClick={handleMenuOpen}>
              Ayarlar
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Ana Sayfa</MenuItem>
              <MenuItem onClick={handleMenuClose}>Favori Filmler</MenuItem>
              <MenuItem onClick={handleMenuClose}>Ayarlar</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
);
}

export default Navbar;
