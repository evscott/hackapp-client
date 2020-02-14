import React from "react";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import HackathonCard from "./HackathonCard";

const useStyles = makeStyles(theme => {
  return {

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

  return (
    <Page title="Dashboard" drawerPrimary={drawerPrimary} drawerSecondary={drawerSecondary}>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>

      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>
      <HackathonCard/>

    </Page>
  );
}
