import {BrowserRouter as  Routes, Route} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomePage } from "./pages/home/HomePage"
import { MovieDetails } from "./pages/movieDetails/MovieDetails"
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";



function App() {
  const initialDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState<boolean>(initialDarkMode);

   // Update localStorage whenever darkMode changes
   useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const appTheme = createTheme({

    palette: {
      mode: darkMode ? "dark" : "light",
    },
    
  })


  const toggleDarkMode = () => {
    
    setDarkMode((prevMode) => !prevMode);
  };

  return (
  
<>
 {/*   <ThemeProvider theme={appTheme}> */}
     <CssBaseline />
   <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
   <Container /* sx={{bgcolor:(darkMode ? "black": "white"), minHeight: '100vh'}} */>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route  path="/movie-details" element={<MovieDetails/>} />
    <Route  path="/favorite-list" element={<FavoriteLists/>} />
    </Routes>
    footer alanı
    </Container>
   
  {/*  </ThemeProvider> */}
  </>
  
  )
}

export default App
