import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { DASHBOARD_ROUTE } from "../../routes";
import Page from "../page/Page";
import HackathonCard from "../dashboard/HackathonCard";
import ReorderableCardForm from "../reusable/ReorderableCardForm";
import MdEditor from "../hack_forms/details/MdEditor";

/** Where to redirect to, if applicable */
const REDIRECT = {
  NONE: "",
  DASHBOARD: <Redirect to={DASHBOARD_ROUTE} />
};

/**
 * Shows a regular user the hackathon information without
 * any edit options. Also has a button to register for the
 * hackathon.
 */
function UserViewHackathonPage(props) {
  // The hackathon to display
  const hackathon = props.hackathon || {};
  const draft = (hackathon.overview || {}).draft;

  // Redirect when certain buttons are pressed
  const [redirect, setRedirect] = useState(REDIRECT.NONE);

  // Auto-redirect if don't have permission to view
  if (draft) return REDIRECT.DASHBOARD;
  if (redirect !== REDIRECT.NONE) return redirect;

  /** The header for the drawer on the left of the screen */
  const drawerHeader = (
    <div>
      <Typography variant="h4" component="h2">
        View Hackathon
      </Typography>
      <Typography variant="body1" component="p">
        {hackathon.overview.name}
      </Typography>
    </div>
  );

  /** The buttons available on the left side of the screen */
  const drawerPrimary = [
    {
      icon: <ArrowBackIcon />,
      text: "Back to Dashboard",
      onClick: () => setRedirect(REDIRECT.DASHBOARD)
    }
  ];

  return (
    <Page
      title="View Hackathon"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
    >
      <HackathonCard overview={hackathon.overview} />
      <ReorderableCardForm
        array={hackathon.details}
        getCardContents={index => (
          <MdEditor text={hackathon.details[index]} viewMode />
        )}
        viewMode
      />
    </Page>
  );
}

UserViewHackathonPage.propTypes = {
  hid: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  hackathon: state.hackathons.byHID[ownProps.hid]
});

export default connect(mapStateToProps)(UserViewHackathonPage);
