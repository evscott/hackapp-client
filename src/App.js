import React from "react";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import SetupPage from "./components/setup/SetupPage";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SetupPage />
    </MuiThemeProvider>
  );
}

export default App;
