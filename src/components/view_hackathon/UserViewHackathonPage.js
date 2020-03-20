import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  addRegistration,
  updateRegistration,
  deleteRegistration
} from "../../redux/actions/registrationActions";
import Typography from "@material-ui/core/Typography";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { DASHBOARD_ROUTE } from "../../routes";
import Page from "../page/Page";
import HackathonCard from "../dashboard/HackathonCard";
import ReorderableCardForm from "../reusable/ReorderableCardForm";
import MdEditor from "../hack_forms/details/MdEditor";
import { makeStyles } from "@material-ui/core/styles";
import MegaModal from "../reusable/Modal";
import RegQuestionViewer from "../hack_forms/questions/RegQuestionViewer";
import SaveButtonBar from "./SaveButtonBar";
import SignInModal from "../signin_forms/SignInModal";

/** This defines the styles for the React component */
const useStyles = makeStyles(theme => {
  return {
    button: {
      marginLeft: theme.spacing(1)
    },
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20
    },
    icon: {
      marginRight: 10
    }
  };
});

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
  const classes = useStyles();
  // The hackathon to display
  const hackathon = props.hackathon || {};
  const draft = (hackathon.overview || {}).draft;

  // Redirect when certain buttons are pressed
  const [redirect, setRedirect] = useState(REDIRECT.NONE);
  // Hold whether the modal is open
  const [modalOpen, setModalOpen] = useState(false);
  // When must login (before registering), holds whether we're signing in or up
  const [signUp, setSignUp] = useState(false);
  // Hold answers to the registration questions
  // Initializes to an array of empty arrays
  const [answers, setAnswers] = useState(
    Array.from(hackathon.questions, _ => [])
  );

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

  /**
   * Gets the floating action button. Shows "Edit" if already registered,
   * or "Register" if not yet registered.
   */
  const getFab = () => {
    if (hackathon.overview.regDeadline > new Date()) {
      if (!props.loggedIn) {
        return (
          <Fab
            variant="extended"
            color="primary"
            className={classes.fab}
            onClick={() => setModalOpen(true)}
          >
            <ArrowForwardIcon className={classes.icon} />
            Sign In to Register
          </Fab>
        );
      } else if (props.registered) {
        return (
          <Fab
            variant="extended"
            color="primary"
            className={classes.fab}
            onClick={() => {
              setAnswers(props.oldRegistration);
              setModalOpen(true);
            }}
          >
            <EditIcon className={classes.icon} />
            Edit Registration
          </Fab>
        );
      } else {
        return (
          <Fab
            variant="extended"
            color="primary"
            className={classes.fab}
            onClick={() => setModalOpen(true)}
          >
            <EmojiPeopleIcon className={classes.icon} />
            Register
          </Fab>
        );
      }
    }
  };

  /** Gets the modal for registering for the hackathon */
  const getRegistrationModal = () => {
    if (props.loggedIn) {
      return (
        <MegaModal open={modalOpen} setOpen={setModalOpen}>
          <Typography variant="h2">Register</Typography>
          <ReorderableCardForm
            array={hackathon.questions}
            getCardContents={index => (
              <RegQuestionViewer
                question={hackathon.questions[index]}
                answers={answers[index]}
                setAnswers={ans => {
                  // Replace the answer in the array
                  const newAnswers = [...answers];
                  newAnswers[index] = ans;
                  setAnswers(newAnswers);
                }}
              />
            )}
            viewMode
          />
          <SaveButtonBar
            onCancel={() => {
              if (props.registered) props.deleteRegistration(props.hid);
              setModalOpen(false);
            }}
            onSave={() => {
              if (props.registered)
                props.updateRegistration(props.hid, answers);
              else props.addRegistration(props.hid, answers);
              setModalOpen(false);
            }}
            saveText={props.registered ? "Update" : "Register"}
            cancelText={props.registered ? "Cancel Registration" : "Cancel"}
          />
        </MegaModal>
      );
    } else {
      return (
        <SignInModal
          open={modalOpen}
          setOpen={setModalOpen}
          signUpForm={signUp}
          setSignUpForm={setSignUp}
        />
      );
    }
  };

  return (
    <Page
      title="View Hackathon"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
    >
      {getRegistrationModal()}
      <HackathonCard overview={hackathon.overview} />
      <ReorderableCardForm
        array={hackathon.details}
        getCardContents={index => (
          <MdEditor text={hackathon.details[index]} viewMode />
        )}
        viewMode
      />
      {getFab()}
    </Page>
  );
}

UserViewHackathonPage.propTypes = {
  hid: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  hackathon: state.hackathons.byHID[ownProps.hid],
  registered: state.registrations.byHID[ownProps.hid] !== undefined,
  oldRegistration: state.registrations.byHID[ownProps.hid],
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps, {
  addRegistration,
  updateRegistration,
  deleteRegistration
})(UserViewHackathonPage);
