import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { MovieDetails } from "./pages/movieDetails/MovieDetails"
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists"

function App() {


  return (
  
    <Routes>
    <Route exact path="/" element={<HomePage/>} />
    <Route  path="/movie-details" element={<MovieDetails/>} />
    <Route  path="/favorite-list" element={<FavoriteLists/>} />
    </Routes>

  )
}

export default App
