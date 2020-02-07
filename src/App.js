import React from "react";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import SetupPage from "./components/setup/SetupPage";

/**
 * The application. Has a theme and routes.
 * @returns {*} The application (JSX)
 */
function App() {
  // @TODO: Add routes
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SetupPage />
    </MuiThemeProvider>
  );
}

export default App;
