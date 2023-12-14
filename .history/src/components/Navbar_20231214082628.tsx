import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TheatersIcon from "@mui/icons-material/Theaters";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  return (
    <AppBar
      position="static"
      color={theme.palette.mode === "light" ? "default" : "primary"}
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row">
              <LocalShippingIcon sx={{ mt: "5px" }} />
              <Typography variant="h6">TIRPORT Movie</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row">
              <TheatersIcon style={{ margin: 0 }} />
              <SearchIcon style={{ margin: 0 }} />
              <InputBase
                placeholder="Ara..."
                style={{ color: "inherit", flexGrow: 1, width: "100%" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={()=>navigate("/")}>Ana Sayfa</Button>
            <Button color="inherit" onClick={()=>navigate("/favorite-list")}>Favori Filmler</Button>
          
          <Button variant="text" color="secondary" onClick={toggleDarkMode}>{ darkMode ?    <Brightness4Icon sx={{ color: "#000" }} /> : <Brightness7Icon sx={{ color: "#FFB534" }} /> }</Button>

             <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
              inputProps={{ "aria-label": "toggle dark mode" }}
              icon={<Brightness4Icon sx={{ color: "#000" }} />}
              checkedIcon={<Brightness7Icon sx={{ color: "#FFB534" }} />}
              sx={{
                "& .MuiSwitch-thumb": {
                  width: "24px",
                  height: "24px",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                },
                "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                  backgroundColor: "transparent",
                  opacity: 0,
                },
                mb: "2px",
              }}
            /> 
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
