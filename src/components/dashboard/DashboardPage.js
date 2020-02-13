import React from "react";
import Page from "../page/Page";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

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
    <Page drawerPrimary={drawerPrimary} drawerSecondary={drawerSecondary}>
      <p>BACON</p>
      <p>BACON</p>
      <p>BACON</p>
      <p>BACON</p>
    </Page>
  );
}
