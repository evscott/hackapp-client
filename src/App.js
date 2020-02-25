import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import SetupPage from "./components/setup/SetupPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import CreateHackathonPage from "./components/create_hackathon/CreateHackathonPage";

/**
 * The application. Has a theme and routes.
 * @returns {*} The application (JSX)
 */
function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <CssBaseline />
          <Switch>
            <Route path="/setup">
              <SetupPage />
            </Route>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route path="/create">
              <CreateHackathonPage />
            </Route>
          </Switch>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
