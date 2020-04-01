import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  addRegistration,
  updateRegistration,
  deleteRegistration
} from "../../redux/actions/registrationActions";
import { getHackathonDetails } from "../../redux/actions/hackDetailsActions";
import { getHackathonQuestions } from "../../redux/actions/hackQuestionsActions";
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
import { convertDetailsFromReduxToUI } from "../../redux/util/detailsAdapter";
import { convertQuestionsFromReduxToUI } from "../../redux/util/questionsAdapter";

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
  // Load in the data on mount
  useEffect(() => {
    if(!props.details) props.getHackathonDetails(props.hid);
    if(!props.questions) props.getHackathonQuestions(props.hid);
  }, [props]); // Reload if there are changes to the props

  // Redirect when certain buttons are pressed
  const [redirect, setRedirect] = useState(REDIRECT.NONE);
  // Hold whether the modal is open
  const [modalOpen, setModalOpen] = useState(false);
  // When must login (before registering), holds whether we're signing in or up
  const [signUp, setSignUp] = useState(false);
  // Hold answers to the registration questions
  // Initializes to an array of empty arrays
  const [answers, setAnswers] = useState(
    Array.from(props.questions || [], () => [])
  );

  // Auto-redirect if don't have permission to view
  const draft = (props.overview || {}).draft;
  if (draft) return REDIRECT.DASHBOARD;
  if (redirect !== REDIRECT.NONE) return redirect;

  /** The header for the drawer on the left of the screen */
  const drawerHeader = (
    <div>
      <Typography variant="h4" component="h2">
        View Hackathon
      </Typography>
      <Typography variant="body1" component="p">
        {(props.overview || {}).name || "Loading..."}
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
    setAnswers(Array.from(props.questions || [], () => []));
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
            array={props.questions}
            getCardContents={index => (
              <RegQuestionViewer
                question={props.questions[index]}
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
    if (props.overview) {
      return <HackathonCard overview={props.overview} />;
    } else return <LoadingCard />;
  };

  /** Gets the details for the hackathon, if loaded */
  const getHackathonDetails = () => {
    if (props.details) {
      return (
        <ReorderableCardForm
          array={props.details}
          getCardContents={index => (
            <MdEditor text={props.details[index].detail} viewMode />
          )}
          viewMode
        />
      );
    } else {
      // If we have an overview but no details, get the details
      props.getHackathonDetails(props.hid);
      return <LoadingCard />;
    }
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
        loading={props.questions === undefined}
        regDeadline={(props.overview || {}).regDeadline}
        loggedIn={props.loggedIn}
        registered={props.registered}
      />
    </Page>
  );
}

UserViewHackathonPage.propTypes = {
  hid: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const hackathon = state.hackathons.byHID[ownProps.hid] || {};
  return {
    overview: hackathon.overview,
    details: convertDetailsFromReduxToUI(hackathon.details),
    questions: convertQuestionsFromReduxToUI(hackathon.questions),
    registered: state.registrations.byHID[ownProps.hid] !== undefined,
    oldRegistration: state.registrations.byHID[ownProps.hid],
    loggedIn: state.user.loggedIn
  };
};

export default connect(mapStateToProps, {
  addRegistration,
  updateRegistration,
  deleteRegistration,
  getHackathonDetails,
  getHackathonQuestions
})(UserViewHackathonPage);
