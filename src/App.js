import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import SetupPage from "./components/setup/SetupPage";
import DashboardPage from "./components/dashboard/DashboardPage";

/**
 * The application. Has a theme and routes.
 * @returns {*} The application (JSX)
 */
function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/setup">
            <SetupPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
