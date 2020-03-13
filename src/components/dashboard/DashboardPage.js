import React from "react";
import { Redirect } from "react-router-dom";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HackathonCard from "./HackathonCard";
import { CREATE_HACKATHON_ROUTE } from "../../routes";

/** The routes that we might redirect to by clicking a button. */
const REDIRECT = {
  NONE: "",
  CREATE: <Redirect to={CREATE_HACKATHON_ROUTE} />
};

/**
 * Temporary list of past hackathons.
 * @TODO: Connect this to the information store
 * @type {*[]}
 */
const pastHackathons = [
  {
    name: "MtA Hacks 2018",
    startDate: new Date('February 6, 1995 06:30:00'),
    endDate: new Date('February 6, 1995 16:30:00'),
    location: "Mount Allison University",
    maxRegistrants: 59,
    regDeadline: new Date('February 6, 1995 06:30:00')
  },
  {
    name: "MtA Hacks 2019",
    startDate: new Date('February 7, 1995 10:30:00'),
    endDate: new Date('February 8, 1995 20:35:00'),
    location: "Mount Allison University",
    maxRegistrants: 65,
    regDeadline: new Date('February 7, 1995 10:30:00')
  }
];

/**
 * Temporary list of upcoming hackathons.
 * @TODO: Connect this to the information store
 * @type {*[]}
 */
const upcomingHackathons = [
  {
    name: "MtA Hacks 2020",
    startDate: new Date('February 7, 2021 18:00:00'),
    endDate: new Date('February 8, 2021 13:30:00'),
    location: "Mount Allison University",
    maxRegistrants: 79,
    regDeadline: new Date('February 7, 2021 18:00:00'),
  },
  {
    name: "MtA Hacks 2021",
    startDate: new Date('February 7, 2021 18:00:00'),
    endDate: new Date('February 8, 2021 13:30:00'),
    location: "Mount Allison University",
    maxRegistrants: 854,
    regDeadline: new Date('February 7, 2021 18:00:00'),
  },
  {
    name: "MtA Hacks 2022",
    startDate: new Date('February 7, 2021 18:00:00'),
    endDate: new Date('February 8, 2021 13:30:00'),
    location: "Mount Allison University",
    maxRegistrants: 79438,
    regDeadline: new Date('February 7, 2021 18:00:00'),
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
 * The primary settings for the page drawer.
 * @type {{icon: *, text: string}[]}
 */
const drawerPrimary = [
  {
    icon: <SettingsIcon />,
    text: "Settings",
    onClick: () => console.log("Settings go here")
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
  const [redirect, setRedirect] = React.useState(REDIRECT.NONE);

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
      {redirect}
      <Typography className={classes.subheader} variant="h4" component="h2">
        Upcoming Hackathons
      </Typography>
      {upcomingHackathons.map(hackathon => (
        <HackathonCard overview={hackathon} key={hackathon.name + hackathon.startDate + hackathon.endDate} />
      ))}
      <Typography className={classes.subheader} variant="h4" component="h2">
        Past Hackathons
      </Typography>
      {pastHackathons.map(hackathon => (
        <HackathonCard overview={hackathon} key={hackathon.name + hackathon.startDate + hackathon.endDate} />
      ))}
      <Tooltip title="Create New Hackathon" arrow placement="top">
        <Fab className={classes.fab} color="primary" onClick={() => setRedirect(REDIRECT.CREATE)} >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Page>
  );
}
