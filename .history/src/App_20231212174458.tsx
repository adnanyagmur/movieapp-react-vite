import {BrowserRouter as Router, Route} from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { MovieDetails } from "./pages/movieDetails/MovieDetails"
import { FavoriteLists } from "./pages/favoriteLists/FavoriteLists"

function App() {


  return (
   <Router>
    <Route  path="/" element={<HomePage/>} />
    <Route  path="/movie-details" element={<MovieDetails/>} />
    <Route  path="/favorite-list" element={<FavoriteLists/>} />
   </Router>
  )
}

export default App
