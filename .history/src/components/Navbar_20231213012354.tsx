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
} from '@mui/material';
import MenuIcon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/ContentPasteSearchSharp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


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
    <AppBar /* position="static" */  /* sx={{color:"#fff", background: "#000"}} */>
       <Toolbar style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            Movie App
          </Typography>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
            }}
          >
            <div
              style={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SearchIcon style={{ marginRight: '8px' }} />
              <InputBase
                placeholder="Ara..."
                style={{
                  color: 'inherit',
                  flexGrow: 1,
                  width: '100%',
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="default"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
            icon={<Brightness4Icon />}
            checkedIcon={<Brightness7Icon sx={{color:"#123"}} />}
            sx={{
                '& .MuiSwitch-thumb': {
                  width: '24px',
                  height: '24px',
                  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: theme.palette.primary.main,
                  opacity: 0.7,
                },
                '& .MuiSwitch-switchBase.Mui-checked:hover + .MuiSwitch-track': {
                  backgroundColor: theme.palette.primary.main,
                  opacity: 1,
                },
              }}
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
        </div>
      </Toolbar>
    </AppBar>

  
  );
}

export default Navbar;
