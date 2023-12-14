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
} from '@mui/material';
import MenuIcon from '@mui/material/Icon';
import SearchIcon from '@mui/material/Icon';


function Navbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{color:"#fff", background: "#000"}}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            Movie App
          </Typography>
          <div
            style={{
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              marginLeft: '16px',
              width: '150px',
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
        <div>
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
