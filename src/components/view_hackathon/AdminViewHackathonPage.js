import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { updateHackathonOverview } from "../../redux/actions/hackOverviewActions";
import { updateAllHackathonDetails } from "../../redux/actions/hackDetailsActions";
import { getHackathonDetails } from "../../redux/actions/hackDetailsActions";
import { getHackathonQuestions } from "../../redux/actions/hackQuestionsActions";
import { deleteHackathon, publishHackathon } from "../../redux/actions/hackathonActions";
import { convertDetailsFromReduxToUI } from "../../redux/util/detailsAdapter";
import {
  PAGE_TITLES,
  PAGES
} from "../create_hackathon/CreateHackathonSubpages";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Typography from "@material-ui/core/Typography";
import Page from "../page/Page";
import { DASHBOARD_ROUTE } from "../../routes";
import HackathonPreviewForm from "../hack_forms/HackathonPreviewForm";
import { connect } from "react-redux";
import EditFab from "../reusable/EditFab";
import MegaModal from "../reusable/Modal";
import OverviewEditor from "../hack_forms/overview/OverviewEditor";
import RegistrationDetailsForm from "../hack_forms/questions/RegistrationDetailsForm";
import HackathonDetailsForm from "../hack_forms/details/HackathonDetailsForm";
import SaveButtonBar from "./SaveButtonBar";
import { makeStyles } from "@material-ui/core/styles";
import { convertQuestionsFromReduxToUI } from "../../redux/util/questionsAdapter";

/** Where to redirect to, if applicable */
const REDIRECT = {
  NONE: "",
  DASHBOARD: <Redirect to={DASHBOARD_ROUTE} />
};

/** This defines the styles for the React component */
const useStyles = makeStyles(theme => {
  return {
    spacer: {
      height: 15,
      clear: "all",
      width: "100%"
    }
  };
});

/**
 * The page for viewing a hackathon as an administrator. It has options for
 * editing the hackathon as well by clicking on the edit button.
 */
function AdminViewHackathonPage(props) {
  const classes = useStyles();
  // Get the draft property without crashing when things are null
  const draft = (props.overview || {}).draft;

  // Load in the data on mount
  useEffect(() => {
    if(!props.details) props.getHackathonDetails(props.hid);
    if(!props.questions) props.getHackathonQuestions(props.hid);
  }, [props]); // Reload if there are changes to the props

  // Hold onto temporary versions of the overview/details/questions
  // for edits: we only want to save and send to the redux store if
  // the user clicks "Save".
  const [overview, setOverview] = useState(props.overview);
  const [details, setDetails] = useState(props.details);
  const [questions, setQuestions] = useState(props.questions);

  // Change the state whenever redux changes something
  useEffect(() => setOverview(props.overview), [props.overview]);
  useEffect(() => setDetails(props.details), [props.details]);
  useEffect(() => setQuestions(props.questions), [props.questions]);

  // When we redirect, we set the state here
  const [redirect, setRedirect] = useState(REDIRECT.NONE);
  // Hold whether the editing modal is open or not
  const [modalOpen, setModalOpen] = useState(false);
  // Handle which page is being viewed
  const [page, setPage] = useState(PAGES.OVERVIEW);

  // Redirect immediately so we don't throw errors about nulls
  if (redirect !== REDIRECT.NONE) return redirect;

  /**
   * The header for the drawer on the left hand side. It just has
   * the title of the page and hackathon.
   */
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

  /** The primary buttons in the drawer for changing the hackathon */
  const drawerPrimary = [
    {
      icon: <CloudDownloadIcon />,
      text: "Download Registration CSV",
      onClick: () => {
        console.log("Not implemented");
      }
    },
    {
      icon: draft ? <VisibilityIcon /> : <VisibilityOffIcon />,
      text: draft ? "Publish Hackathon" : "Unpublish Hackathon",
      // On clicking unpublish, we should change the draft flag
      onClick: () => {
        props.publishHackathon(props.hid, !draft);
      }
    },
    {
      icon: <DeleteIcon />,
      text: "Delete Hackathon",
      onClick: () => {
        props.deleteHackathon(props.hid);
        setRedirect(REDIRECT.DASHBOARD);
      }
    }
  ];

  /** The secondary buttons in the drawer (for leaving to the dashboard) */
  const drawerSecondary = [
    {
      icon: <ArrowBackIcon />,
      text: "Back to Dashboard",
      onClick: () => setRedirect(REDIRECT.DASHBOARD)
    }
  ];

  /** Saves the changes to the hackathon in the redux store */
  const save = () => {
    switch (page) {
      case PAGES.OVERVIEW:
        props.updateHackathonOverview(overview);
        break;
      case PAGES.DETAILS:
        props.updateAllHackathonDetails(details, props.hid);
        break;
      case PAGES.REGISTRATION:
        break;
      default:
        break;
    }
    setModalOpen(false);
  };

  /**
   * Resets the state of the editors back to the actual hackathon stored.
   * Discards changes to the overview, details, and questions.
   */
  const discard = () => {
    setOverview(props.overview);
    setDetails(props.details);
    setQuestions(props.questions);
    setModalOpen(false);
  };

  /** Gets the modal for editing, based on the page being viewed. */
  const currModal = () => {
    switch (page) {
      case PAGES.OVERVIEW:
        return <OverviewEditor overview={overview} setOverview={setOverview} />;
      case PAGES.DETAILS:
        return (
          <HackathonDetailsForm details={details} setDetails={setDetails} />
        );
      case PAGES.REGISTRATION:
        return (
          <RegistrationDetailsForm
            questions={questions}
            setQuestions={setQuestions}
          />
        );
      default:
        return "";
    }
  };

  return (
    <Page
      title="View Hackathon"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
      drawerSecondary={drawerSecondary}
    >
      <React.Fragment>
        <HackathonPreviewForm
          overview={props.overview}
          questions={props.questions}
          details={props.details}
          page={page}
          setPage={setPage}
        />
        <EditFab
          onClick={() => setModalOpen(true)}
          loading={!props.overview || !props.details || !props.questions}
        />
        <MegaModal open={modalOpen} setOpen={setModalOpen}>
          <Typography variant="h2" component="h2">
            {PAGE_TITLES[page]}
          </Typography>
          {currModal()}
          <div className={classes.spacer} />
          <SaveButtonBar onCancel={discard} onSave={save} />
          <div className={classes.spacer} />
        </MegaModal>
      </React.Fragment>
    </Page>
  );
}

AdminViewHackathonPage.propTypes = {
  hid: PropTypes.string.isRequired
};

// Gets the hackathon using the URL
const mapStateToProps = (state, ownProps) => {
  const hackathon = state.hackathons.byHID[ownProps.hid] || {};
  return {
    overview: hackathon.overview,
    details: convertDetailsFromReduxToUI(hackathon.details),
    questions: convertQuestionsFromReduxToUI(hackathon.questions)
  };
};

export default connect(mapStateToProps, {
  updateHackathonOverview,
  deleteHackathon,
  getHackathonDetails,
  updateAllHackathonDetails,
  getHackathonQuestions,
  publishHackathon
})(AdminViewHackathonPage);
