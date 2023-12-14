import {BrowserRouter as Routes, Route} from "react-router-dom"
import  HomePage  from "./pages/home/HomePage"

function App() {


  return (
   <Routes>
    <Route  path="/" element={<HomePage/>} />
    <Route  path="/movie-details" element={<HomePage/>} />
    <Route  path="/favorite-list" element={<HomePage/>} />
   </Routes>
  )
}

export default App
