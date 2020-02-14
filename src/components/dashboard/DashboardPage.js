import React from "react";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import HackathonCard from "./HackathonCard";

const hackathons = [
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
  return {};
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

  return (
    <Page
      title="Dashboard"
      drawerPrimary={drawerPrimary}
      drawerSecondary={drawerSecondary}
    >
      {hackathons.map(hackathon => (
        <HackathonCard {...hackathon} />
      ))}
    </Page>
  );
}
