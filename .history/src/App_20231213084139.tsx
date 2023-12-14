import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomePage } from "./pages/home/HomePage"
import { MovieDetails } from "./pages/movieDetails/MovieDetails"
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists"
import Navbar from "./components/Navbar"
import { useState } from "react";

function App() {
  const [mode, setMode]= useState<boolean>(false)

  const appTheme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
    },
  });
  return (
  <>
   <ThemeProvider theme={appTheme}>
      <Navbar />
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route  path="/movie-details" element={<MovieDetails/>} />
    <Route  path="/favorite-list" element={<FavoriteLists/>} />
    </Routes>
    footer alanı
    </ThemeProvider>
    </>
  )
}

export default App
