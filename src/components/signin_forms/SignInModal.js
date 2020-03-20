import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { signIn, signUp } from "../../redux/actions/userActions";
import MegaModal from "../reusable/Modal";
import UserForm from "./UserForm";

/**
 * Modal with signin and signup options. Allows swapping between the
 * two views.
 */
function SignInModal(props) {
  const signUp = props.signUpForm;
  return (
    <MegaModal open={props.open} setOpen={props.setOpen}>
      <Typography variant="h2">{signUp ? "Sign Up" : "Sign In"}</Typography>
      <Typography>
        {signUp
          ? "Sign up and join the hacker community."
          : "Sign in and get hacking."}
      </Typography>
      <UserForm
        onCompleteText={signUp ? "Sign Up" : "Sign In"}
        onComplete={user => {
          if (signUp) props.signUp(user);
          else props.signIn(user);
          props.setOpen(false);
        }}
        onCancel={() => props.setOpen(false)}
        onAccessory={() => props.setSignUpForm(!props.signUpForm)}
        accessoryText={props.signUpForm ? "Sign In" : "Sign Up"}
        getUsername={signUp}
      />
    </MegaModal>
  );
}

SignInModal.propTypes = {
  // Whether the modal is open
  open: PropTypes.bool.isRequired,
  // Function that sets whether the modal is open
  setOpen: PropTypes.func.isRequired,
  // Whether it should have signup options
  signUpForm: PropTypes.bool.isRequired,
  // Function that sets whether the modal is for signing up
  setSignUpForm: PropTypes.func.isRequired
};

export default connect(null, { signIn, signUp })(SignInModal);
