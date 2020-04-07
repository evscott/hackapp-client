import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { updateUser } from "../../redux/actions/userActions";
import MegaModal from "../reusable/Modal";
import UserForm from "./UserForm";

function UserSettingsModal(props) {
  return (
    <MegaModal open={props.open} setOpen={props.setOpen}>
      <Typography variant="h2">User Settings</Typography>
      <UserForm
        onComplete={user => {
          props.updateUser(user);
          props.setOpen(false);
        }}
        onCompleteText="Update User"
        onCancel={() => props.setOpen(false)}
        initialUser={props.user}
        getUsername
      />
    </MegaModal>
  );
}

UserSettingsModal.propTypes = {
  // Whether the modal is open
  open: PropTypes.bool.isRequired,
  // Function that sets whether the modal is open
  setOpen: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  // If logged in, pass in more properties
  if (state.user.loggedIn) return { user: state.user.user };
  else return { user: {} };
};

export default connect(mapStateToProps, { updateUser })(UserSettingsModal);
