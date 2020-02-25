import React from "react";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HackathonCard from "./HackathonCard";

/**
 * Temporary list of past hackathons.
 * @TODO: Connect this to the information store
 * @type {*[]}
 */
const pastHackathons = [
  {
    title: "MtA Hacks 2018",
    startDate: "6:00PM Feb 8",
    endDate: "1:30PM Feb 9"
  },
  {
    title: "MtA Hacks 2019",
    startDate: "6:00PM Feb 8",
    endDate: "1:30PM Feb 9"
  }
];

/**
 * Temporary list of upcoming hackathons.
 * @TODO: Connect this to the information store
 * @type {*[]}
 */
const upcomingHackathons = [
  {
    title: "MtA Hacks 2020",
    startDate: "6:00PM Feb 8",
    endDate: "1:30PM Feb 9"
  },
  {
    title: "MtA Hacks 2021",
    startDate: "6:00PM Feb 8",
    endDate: "1:30PM Feb 9"
  },
  {
    title: "MtA Hacks 2022",
    startDate: "6:00PM Feb 8",
    endDate: "1:30PM Feb 9"
  }
];

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",
      right: 20,
      bottom: 30
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
 * The primary settings for the page drawer.
 * @type {{icon: *, text: string}[]}
 */
const drawerPrimary = [
  {
    icon: <SettingsIcon />,
    text: "Settings"
  }
];

/**
 * The secondary settings for the page drawer.
 * @type {Array}
 */
const drawerSecondary = [];

/**
 * The first page a hackathon manager sees upon logging in. It features
 * a list of all hackathons being managed and standard navigation items.
 * @returns {*} The page for the dashboard.
 */
export default function DashboardPage() {
  const classes = useStyles();

  // Creates the drawer header content which is injected into the page
  // based on the hackathon statistics.
  const drawerHeader = (
    <div>
      <Typography
        className={classes.drawerHeaderText}
        variant="h4"
        component="p"
      >
        Hacker Stats
      </Typography>
      <Typography
        className={classes.drawerSmallTest}
        variant="body1"
        component="p"
      >
        <b>{upcomingHackathons.length}</b> upcoming
      </Typography>
      <Typography
        className={classes.drawerSmallTest}
        variant="body1"
        component="p"
      >
        <b>{pastHackathons.length}</b> done
      </Typography>
      <Typography
        className={classes.drawerSmallTest}
        variant="body1"
        component="p"
      >
        <b>Infinite</b> potential
      </Typography>
    </div>
  );

  return (
    <Page
      title="Dashboard"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
      drawerSecondary={drawerSecondary}
    >
      <Typography className={classes.subheader} variant="h4" component="h2">
        Upcoming Hackathons
      </Typography>
      {upcomingHackathons.map(hackathon => (
        <HackathonCard {...hackathon} key={hackathon.title + hackathon.startDate + hackathon.endDate} />
      ))}
      <Typography className={classes.subheader} variant="h4" component="h2">
        Past Hackathons
      </Typography>
      {pastHackathons.map(hackathon => (
        <HackathonCard {...hackathon} key={hackathon.title + hackathon.startDate + hackathon.endDate} />
      ))}
      <Tooltip title="Create New Hackathon" arrow placement="top">
        <Fab className={classes.fab} color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
    </Page>
  );
}
