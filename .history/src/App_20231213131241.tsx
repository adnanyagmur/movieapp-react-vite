import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomePage } from "./pages/home/HomePage"
import { MovieDetails } from "./pages/movieDetails/MovieDetails"
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists"
import Navbar from "./components/Navbar"
import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FFC107",
    },
    mode: "light",
  },
  bg: {
    default: "#fff", // Light mode için varsayılan arka plan rengi
    dark: "#333",   // Dark mode için varsayılan arka plan rengi
  },

});

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const appTheme = createTheme({
    ...theme,
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
   

   <ThemeProvider theme={appTheme}>
    <Container sx={{bgcolor:(darkMode ? "black": "white")}}>
   <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route  path="/movie-details" element={<MovieDetails/>} />
    <Route  path="/favorite-list" element={<FavoriteLists/>} />
    </Routes>
    footer alanı
    </Container>
    </ThemeProvider>
    
    
  )
}

export default App
