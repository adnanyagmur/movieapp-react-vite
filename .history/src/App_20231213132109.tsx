import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomePage } from "./pages/home/HomePage"
import { MovieDetails } from "./pages/movieDetails/MovieDetails"
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists"
import Navbar from "./components/Navbar"
import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";



function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const appTheme = createTheme({
   
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div style={{backgroundColor:(darkMode ? "black": "white")}}>

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
    
    </div>
  )
}

export default App
