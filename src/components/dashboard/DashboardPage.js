import React from "react";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import HackathonCard from "./HackathonCard";

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

const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20
    },
    drawerHeaderText: {
      textAlign: "center"
    },
    subheader: {
      margin: "40px 0px 10px 0px",
      color: "#999999"
    }
  };
});

const drawerPrimary = [
  {
    icon: <SettingsIcon />,
    text: "Settings"
  }
];

const drawerSecondary = [];

export default function DashboardPage() {
  const classes = useStyles();

  const drawerHeader = (
    <div>
      <Typography className={classes.drawerHeaderText} variant="h5" component="p">
        <b>{upcomingHackathons.length}</b> upcoming
      </Typography>
      <Typography className={classes.drawerHeaderText} variant="h5" component="p">
        <b>{pastHackathons.length}</b> done
      </Typography>
      <Typography className={classes.drawerHeaderText} variant="h5" component="p">
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
        <HackathonCard {...hackathon} />
      ))}
      <Typography className={classes.subheader} variant="h4" component="h2">
        Past Hackathons
      </Typography>
      {pastHackathons.map(hackathon => (
        <HackathonCard {...hackathon} />
      ))}
      <Fab className={classes.fab} color="primary">
        <AddIcon/>
      </Fab>
    </Page>
  );
}
