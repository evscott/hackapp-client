import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import PropTypes from "prop-types";
import { signOut } from "../../redux/actions/userActions";
import UserInfoCard from "./UserInfoCard";
import UserLoginCard from "./UserLoginCard";
import SignInModal from "../signin_forms/SignInModal";

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
  // Whether the modal is open
  const [modalOpen, setModalOpen] = useState(false);
  // Whether the modal form is a signup form or not
  const [signUpForm, setSignUpForm] = useState(false);
  const classes = useStyles();
  const open = Boolean(props.anchor);

  // If logged in, set modal to be closed
  if(props.loggedIn && modalOpen) setModalOpen(false);

  const openSignUp = () => {
    setModalOpen(true);
    setSignUpForm(true);
  };

  const openSignIn = () => {
    setModalOpen(true);
    setSignUpForm(false);
  };

  /** Gets the content of the popover based on if the user is logged in. */
  const getCard = () => {
    if (!props.loggedIn) {
      return <UserLoginCard onSignUp={openSignUp} onSignIn={openSignIn} />;
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
      <SignInModal
        open={modalOpen}
        setOpen={setModalOpen}
        signUpForm={signUpForm}
        setSignUpForm={setSignUpForm}
      />
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

export default connect(mapStateToProps, { signOut })(
  UserPopover
);
