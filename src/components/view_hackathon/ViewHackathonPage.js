import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  deleteHackathon,
  updateHackathon
} from "../../redux/actions/hackathonActions";
import {
  PAGE_TITLES,
  PAGES
} from "../create_hackathon/CreateHackathonSubpages";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Page from "../page/Page";
import { DASHBOARD_ROUTE } from "../../routes";
import HackathonPreviewForm from "../hack_forms/HackathonPreviewForm";
import { connect } from "react-redux";
import FabNav from "../reusable/FabNav";
import MegaModal from "../reusable/Modal";
import OverviewEditor from "../hack_forms/overview/OverviewEditor";
import RegistrationDetailsForm from "../hack_forms/questions/RegistrationDetailsForm";
import HackathonDetailsForm from "../hack_forms/details/HackathonDetailsForm";
import SaveButtonBar from "./SaveButtonBar";
import { makeStyles } from "@material-ui/core/styles";

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
function ViewHackathonPage(props) {
  const classes = useStyles();
  const hackathon = props.hackathon || {};
  // Get the draft property without crashing when things are null
  const draft = (hackathon.overview || {}).draft;

  // Hold onto temporary versions of the overview/details/questions
  // for edits: we only want to save and send to the redux store if
  // the user clicks "Save".
  const [overview, setOverview] = useState(hackathon.overview);
  const [details, setDetails] = useState(hackathon.details);
  const [questions, setQuestions] = useState(hackathon.questions);

  // When we redirect, we set the state here
  const [redirect, setRedirect] = useState(REDIRECT.NONE);
  // Hold whether the editing modal is open or not
  const [modalOpen, setModalOpen] = useState(false);
  // Handle which page is being viewed
  const [page, setPage] = useState(PAGES.OVERVIEW);

  // Redirect immediately so we don't throw errors about nulls
  if(redirect !== REDIRECT.NONE) {
    return redirect
  }

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
        {hackathon.overview.name}
      </Typography>
    </div>
  );

  /** The primary buttons in the drawer for changing the hackathon */
  const drawerPrimary = [
    {
      icon: <DeleteIcon />,
      text: "Delete Hackathon",
      onClick: () => {
        props.deleteHackathon(hackathon.hid);
        setRedirect(REDIRECT.DASHBOARD);
      }
    },
    {
      icon: draft ? <VisibilityIcon /> : <VisibilityOffIcon />,
      text: draft ? "Publish Hackathon" : "Unpublish Hackathon",
      // On clicking unpublish, we should change the draft flag
      onClick: () => {
        props.updateHackathon({
          ...hackathon,
          overview: { ...hackathon.overview, draft: !draft }
        });
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
    props.updateHackathon({
      ...hackathon,
      overview,
      details,
      questions
    });
    setModalOpen(false);
  };

  /**
   * Resets the state of the editors back to the actual hackathon stored.
   * Discards changes to the overview, details, and questions.
   */
  const discard = () => {
    const { overview, details, questions } = hackathon;
    setOverview(overview);
    setDetails(details);
    setQuestions(questions);
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
      <HackathonPreviewForm
        overview={hackathon.overview}
        questions={hackathon.questions}
        details={hackathon.details}
        page={page}
        setPage={setPage}
      />
      <FabNav onClickPreview={() => setModalOpen(true)} viewMode={true} />
      <MegaModal open={modalOpen} setOpen={setModalOpen}>
        <Typography variant="h2" component="h2">
          {PAGE_TITLES[page]}
        </Typography>
        {currModal()}
        <div className={classes.spacer} />
        <SaveButtonBar onCancel={discard} onSave={save} />
        <div className={classes.spacer} />
      </MegaModal>
    </Page>
  );
}

// Gets the hackathon using the URL
const mapStateToProps = (state, ownProps) => ({
  hackathon: state.hackathons.byHID[ownProps.match.params.hid]
});

export default connect(mapStateToProps, { updateHackathon, deleteHackathon })(
  ViewHackathonPage
);
