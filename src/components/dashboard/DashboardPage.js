import React from "react";
import { Redirect } from "react-router-dom";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HackathonCard from "./HackathonCard";
import {
  CREATE_HACKATHON_ROUTE,
  viewHackathonRouteFor,
  SETUP_ROUTE
} from "../../routes";
import { connect } from "react-redux";
import {
  sortDraftHackathons,
  sortNextHackathons,
  sortPrevHackathons
} from "../../redux/util/sortHackathons";
import LoadingCard from "../reusable/LoadingCard";
import NoHackathonCard from "./NoHackathonsCard";

/** The routes that we might redirect to by clicking a button. */
const REDIRECT = {
  NONE: "",
  CREATE: <Redirect to={CREATE_HACKATHON_ROUTE} />,
  VIEW: hackathon => <Redirect to={viewHackathonRouteFor(hackathon.hid)} />,
  SETUP: <Redirect to={SETUP_ROUTE} />
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
  if (redirect) return redirect;

  // Also redirect if we're admin and no org
  if (props.admin && !props.orgLoading && !props.org) return REDIRECT.SETUP;

  /**
   * Shows a list of hackathons.
   *
   * @param hackathonList A list of hackathons
   * @param listType The type of hackathons in the list (draft, upcoming, past)
   * @param showOnEmpty If it should show a message when the hackathonList
   * is empty
   * @returns {*} List of hackathon cards
   */
  const showHackathons = (hackathonList, listType, showOnEmpty = false) => {

    const getHackathonCard = () => {
      if(hackathonList.length === 0) return (
        <NoHackathonCard
          admin={props.admin}
          createHackathon={() => setRedirect(REDIRECT.CREATE)}
        />
      );
    };

    if (hackathonList.length > 0 || showOnEmpty) {
      return (
        <React.Fragment>
          <Typography className={classes.subheader} variant="h4" component="h2">
            {listType} Hackathons
          </Typography>
          {getHackathonCard()}
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

  /**
   * Assembles everything on the page into one React fragment.
   * This is necessary since if we're loading data, we have to return
   * a LoadingCard.
   */
  const getPageContents = () => {
    if (props.loading) return <LoadingCard />;
    return (
      <React.Fragment>
        {showHackathons(props.upcomingHackathons, "Upcoming", true)}
        {props.admin ? showHackathons(props.draftHackathons, "Draft") : ""}
        {showHackathons(props.pastHackathons, "Past")}
        {getFab()}
      </React.Fragment>
    );
  };

  return (
    <Page title={props.orgLoading ? "Loading..." : props.org || "HackApp"}>
      {getPageContents()}
    </Page>
  );
}

// Gets the hackathons from the redux store and sorts them
const mapStateToProps = state => {
  const hackArr = Object.values(state.hackathons.byHID);
  const loading = state.hackathons.loading;
  const pastHackathons = sortPrevHackathons(hackArr);
  const upcomingHackathons = sortNextHackathons(hackArr);
  const draftHackathons = sortDraftHackathons(hackArr);
  const org = state.org.name;
  const orgLoading = state.org.loading;
  const admin = state.user.loggedIn && state.user.user.admin;
  return {
    loading,
    pastHackathons,
    upcomingHackathons,
    draftHackathons,
    admin,
    org,
    orgLoading
  };
};

export default connect(mapStateToProps)(DashboardPage);
