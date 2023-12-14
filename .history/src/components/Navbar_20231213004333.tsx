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
        <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Movie App
        </Typography>
        <div style={{
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          marginLeft: 0,
          width: '150px', // Küçük bir genişlik ayarı
        }}>
          <div style={{
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <SearchIcon style={{ marginRight: '8px' }} />
            <InputBase
              placeholder="Ara..."
              style={{
                color: 'inherit',
                flexGrow: 1,
                width: '100%', // Tam genişlik
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </div>
        <div>
          <Button
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            Menü
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
