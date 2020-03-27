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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { DASHBOARD_ROUTE } from "../../routes";
import Page from "../page/Page";
import HackathonCard from "../dashboard/HackathonCard";
import ReorderableCardForm from "../reusable/ReorderableCardForm";
import MdEditor from "../hack_forms/details/MdEditor";
import MegaModal from "../reusable/Modal";
import RegQuestionViewer from "../hack_forms/questions/RegQuestionViewer";
import SaveButtonBar from "./SaveButtonBar";
import SignInModal from "../signin_forms/SignInModal";
import LoadingCard from "../reusable/LoadingCard";
import UserRegFab from "./UserRegFab";

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
  // Hold whether the modal is open
  const [modalOpen, setModalOpen] = useState(false);
  // When must login (before registering), holds whether we're signing in or up
  const [signUp, setSignUp] = useState(false);
  // Hold answers to the registration questions
  // Initializes to an array of empty arrays
  const [answers, setAnswers] = useState(
    Array.from(hackathon.questions || [], () => [])
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
        {(hackathon.overview || {}).name || "Loading..."}
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
   * Opens the modal and resets the answers (otherwise, things
   * could get messy if things are loaded in too late).
   */
  const openModal = () => {
    // Reset the answers
    setAnswers(Array.from(hackathon.questions || [], () => []));
    // But if already registered, use the old registration
    if (props.registered) {
      setAnswers(props.oldRegistration);
    }
    setModalOpen(true);
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

  /** Gets the info card on the hackathon, if loaded */
  const getHackathonCard = () => {
    if (hackathon.overview) {
      return <HackathonCard overview={hackathon.overview} />;
    } else return <LoadingCard />;
  };

  /** Gets the details for the hackathon, if loaded */
  const getHackathonDetails = () => {
    if (hackathon.details) {
      return (
        <ReorderableCardForm
          array={hackathon.details}
          getCardContents={index => (
            <MdEditor text={hackathon.details[index]} viewMode />
          )}
          viewMode
        />
      );
    } else return <LoadingCard />;
  };

  return (
    <Page
      title="View Hackathon"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
    >
      {getRegistrationModal()}
      {getHackathonCard()}
      {getHackathonDetails()}
      <UserRegFab
        openModal={openModal}
        hackathon={hackathon}
        loggedIn={props.loggedIn}
        registered={props.registered}
      />
    </Page>
  );
}

UserViewHackathonPage.propTypes = {
  hid: PropTypes.string.isRequired
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
