import React from "react";
import { HashRouter } from "react-router-dom";
import AppRouter from "./components/app-router";
import AppLayout from "./components/app-layout";
import { purple } from "@mui/material/colors";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
//
const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
