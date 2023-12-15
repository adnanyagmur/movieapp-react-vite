import React from "react";
import "./index.css"
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from "react-redux";
import { store } from './redux/store';
//import '@types/node';
//import dotenv from "dotenv";


//dotenv.config();

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
     <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
