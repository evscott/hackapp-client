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
import {
  CREATE_HACKATHON_PREXISTING_ROUTE,
  CREATE_HACKATHON_ROUTE,
  DASHBOARD_ROUTE,
  SETUP_ROUTE,
  VIEW_HACKATHON_ROUTE
} from "./routes";
import ViewHackathonPage from "./components/view_hackathon/ViewHackathonPage";
import Startup from "./components/Startup";

/**
 * The application. Has a theme and routes.
 * @returns {*} The application (JSX)
 */
function App() {
  return (
    <Startup>
      <Router>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <CssBaseline />
            <Switch>
              <Route path={SETUP_ROUTE} component={SetupPage} />
              <Route
                path={CREATE_HACKATHON_PREXISTING_ROUTE}
                component={CreateHackathonPage}
              />
              <Route
                path={CREATE_HACKATHON_ROUTE}
                component={CreateHackathonPage}
              />
              <Route
                path={VIEW_HACKATHON_ROUTE}
                component={ViewHackathonPage}
              />
              <Route path={DASHBOARD_ROUTE} component={DashboardPage} />
            </Switch>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Router>
    </Startup>
  );
}

export default App;
