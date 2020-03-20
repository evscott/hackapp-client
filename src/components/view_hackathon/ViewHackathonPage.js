import React from "react";
import { connect } from "react-redux";
import AdminViewHackathonPage from "./AdminViewHackathonPage";
import UserViewHackathonPage from "./UserViewHackathonPage";

/**
 * The page for viewing a hackathon as an administrator. It has options for
 * editing the hackathon as well by clicking on the edit button.
 */
function ViewHackathonPage(props) {
  if (props.admin) {
    return <AdminViewHackathonPage hid={props.match.params.hid} />;
  } else {
    return <UserViewHackathonPage hid={props.match.params.hid} />;
  }
}

// Gets the hackathon using the URL
const mapStateToProps = state => ({
  admin: state.user.loggedIn && state.user.user.admin
});

export default connect(mapStateToProps)(ViewHackathonPage);
