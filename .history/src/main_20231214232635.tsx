import React from "react";
import "./index.css"
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import '@types/node';
//import dotenv from "dotenv";


//dotenv.config();

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
  </React.StrictMode>
);
