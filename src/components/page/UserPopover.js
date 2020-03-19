import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { signIn, signUp, signOut } from "../../redux/actions/userActions";
import MegaModal from "../reusable/Modal";
import UserForm from "../signin_forms/UserForm";
import UserInfoCard from "./UserInfoCard";
import UserLoginCard from "./UserLoginCard";

/** The modal displayed when signing in */
const SIGNIN_MODAL = "SIGNIN MODAL";
/** The modal displayed when signing up */
const SIGNUP_MODAL = "SIGNUP MODAL";
/** State when there is no modal */
const NO_MODAL = "NO MODAL";

/**
 * Styles for the user popover.
 */
const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: 20
    }
  };
});

/**
 * A popover card that displays some user information.
 * @param props The anchor and closePopover method for managing when the popover
 * is visible, and the user name and userType.
 */
function UserPopover(props) {
  // The modal that is currently open
  const [modalOpen, setModalOpen] = useState(NO_MODAL);
  const classes = useStyles();
  const open = Boolean(props.anchor);

  const getModal = () => {
    if (modalOpen === SIGNIN_MODAL) {
      return (
        <MegaModal
          open={modalOpen === SIGNIN_MODAL}
          setOpen={() => setModalOpen(NO_MODAL)}
        >
          <Typography variant="h2">Sign In</Typography>
          <Typography>Sign in and get hacking.</Typography>
          <UserForm
            onCompleteText="Sign In"
            onComplete={user => {
              props.signIn(user);
              setModalOpen(NO_MODAL);
              props.closePopover();
            }}
            onCancel={() => setModalOpen(NO_MODAL)}
          />
        </MegaModal>
      );
    } else if (modalOpen === SIGNUP_MODAL) {
      return (
        <MegaModal
          open={modalOpen === SIGNUP_MODAL}
          setOpen={() => setModalOpen(NO_MODAL)}
        >
          <Typography variant="h2">Sign Up</Typography>
          <Typography>Sign up and join the hacker community.</Typography>
          <UserForm
            onCompleteText="Sign Up"
            onComplete={user => {
              props.signUp(user);
              setModalOpen(NO_MODAL);
              props.closePopover();
            }}
            getUsername
          />
        </MegaModal>
      );
    }
  };

  /** Gets the content of the popover based on if the user is logged in. */
  const getCard = () => {
    if (!props.loggedIn) {
      return (
        <UserLoginCard
          onSignUp={() => setModalOpen(SIGNUP_MODAL)}
          onSignIn={() => setModalOpen(SIGNIN_MODAL)}
        />
      );
    } else {
      return (
        <UserInfoCard
          name={props.name}
          details={props.details}
          onSignOut={() => {
            props.closePopover();
            props.signOut();
          }}
        />
      );
    }
  };

  return (
    <Popover
      classes={{
        paper: classes.root
      }}
      open={open}
      id="user-popover"
      anchorEl={props.anchor}
      onClose={props.closePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
    >
      {getModal()}
      {getCard()}
    </Popover>
  );
}

UserPopover.propTypes = {
  // The element to which the popover is anchored/positioned
  anchor: PropTypes.object,
  // The function that closes the popover
  closePopover: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // If logged in, pass in more properties
  if (state.user.loggedIn) {
    return {
      name: `${state.user.user.firstName} ${state.user.user.lastName}`,
      details: state.user.user.admin ? "Admin" : "User",
      loggedIn: true
    };
  } else {
    return {
      loggedIn: false
    };
  }
};

export default connect(mapStateToProps, { signIn, signUp, signOut })(
  UserPopover
);
