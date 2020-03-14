import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import Page from "../page/Page";
import { DASHBOARD_ROUTE } from "../../routes";

const REDIRECT = {
  NONE: "",
  DASHBOARD: <Redirect to={DASHBOARD_ROUTE} />
};

export default function ViewHackathonPage(props) {
  // When we redirect, we set the state here
  const [redirect, setRedirect] = useState(REDIRECT.NONE);

  const drawerHeader = (
    <div>
      <Typography variant="h4">
        View {props.hackathon.overview.name}
      </Typography>
    </div>
  );

  const drawerPrimary = [
    {
      icon: <DeleteIcon />,
      text: "Delete Hackathon",
      onClick: () => setRedirect(REDIRECT.DASHBOARD)
    },
    {
      icon: props.hackathon.draft ? <VisibilityIcon /> : <VisibilityOffIcon />,
      text: props.hackathon.draft ? "Publish Hackathon" : "Unpublish Hackathon",
      onClick: () => console.log("UNIMPLEMENTED")
    }
  ];

  return (
    <Page
      title="View Hackathon"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
    >
      {redirect}
    </Page>
  );
}
