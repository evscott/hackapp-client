import React from "react";
import { Redirect } from "react-router-dom";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HackathonCard from "./HackathonCard";
import { CREATE_HACKATHON_ROUTE, viewHackathonRouteFor } from "../../routes";
import { connect } from "react-redux";
import {
  sortDraftHackathons,
  sortNextHackathons,
  sortPrevHackathons
} from "../../redux/util/sortHackathons";

/** The routes that we might redirect to by clicking a button. */
const REDIRECT = {
  NONE: "",
  CREATE: <Redirect to={CREATE_HACKATHON_ROUTE} />,
  VIEW: hackathon => <Redirect to={viewHackathonRouteFor(hackathon.hid)} />
};

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20
    },
    drawerHeaderText: {
      textAlign: "left",
      marginBottom: 10
    },
    drawerSmallTest: {
      textAlign: "left",
      marginLeft: 10
    },
    subheader: {
      margin: "40px 0px 10px 0px",
      color: "#999999"
    }
  };
});

/**
 * This is the homepage for the application. A regular user sees all upcoming
 * and past hackathons. An admin (must be logged in) sees all upcoming, past,
 * and draft hackathons.
 */
function DashboardPage(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(REDIRECT.NONE);

  /**
   * Shows a list of hackathons.
   *
   * @param hackathonList A list of hackathons
   * @param listType The type of hackathons in the list (draft, upcoming, past)
   * @returns {*} List of hackathon cards
   */
  const showHackathons = (hackathonList, listType) => {
    if (hackathonList.length > 0) {
      return (
        <React.Fragment>
          <Typography className={classes.subheader} variant="h4" component="h2">
            {listType} Hackathons
          </Typography>
          {hackathonList.map(hackathon => (
            <HackathonCard
              overview={hackathon.overview}
              key={hackathon.hid}
              onClick={() => setRedirect(REDIRECT.VIEW(hackathon))}
              hid={hackathon.hid}
            />
          ))}
        </React.Fragment>
      );
    }
  };

  /** Gets the floating action button for adding hackathon if admin */
  const getFab = () => {
    if (props.admin) {
      return (
        <Tooltip title="Create New Hackathon" arrow placement="top">
          <Fab
            className={classes.fab}
            color="primary"
            onClick={() => setRedirect(REDIRECT.CREATE)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      );
    }
  };

  return (
    <Page title="HackApp">
      {redirect}
      {showHackathons(props.upcomingHackathons, "Upcoming")}
      {props.admin ? showHackathons(props.draftHackathons, "Draft") : ""}
      {showHackathons(props.pastHackathons, "Past")}
      {getFab()}
    </Page>
  );
}

// Gets the hackathons from the redux store and sorts them
const mapStateToProps = state => {
  const hackArr = Object.values(state.hackathons.byHID);
  const pastHackathons = sortPrevHackathons(hackArr);
  const upcomingHackathons = sortNextHackathons(hackArr);
  const draftHackathons = sortDraftHackathons(hackArr);
  const admin = state.user.loggedIn && state.user.user.admin;
  return { pastHackathons, upcomingHackathons, draftHackathons, admin };
};

export default connect(mapStateToProps)(DashboardPage);
