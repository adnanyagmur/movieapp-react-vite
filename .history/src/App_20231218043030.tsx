import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HomePage } from "./pages/home/HomePage";
import { MovieDetails } from "./pages/movieDetails/MovieDetails";
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { Footer } from "./components/Footer";

function App() {
  const initialDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState<boolean>(initialDarkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const appTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie-details/:id" element={<MovieDetails />} />
            <Route path="/favorite-list" element={<FavoriteLists />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Container>
        <Footer darkMode={darkMode} />
      </div>
    </ThemeProvider>
  );
}

export default App;
