import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../page/Page";
import Typography from "@material-ui/core/Typography";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import HackathonOverviewForm from "../hack_forms/HackathonOverviewForm";
import HackathonDetailsForm from "../hack_forms/HackathonDetailsForm";
import { DASHBOARD_ROUTE } from "../../routes";
import RegistrationDetailsForm from "../hack_forms/RegistrationDetailsForm";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {});

const PAGES = {
  OVERVIEW: 1,
  DETAILS: 2,
  REGISTRATION: 3,
  PREVIEW: 4
};

const REDIRECT = {
  NONE: "",
  DASHBOARD: <Redirect to={DASHBOARD_ROUTE} />
};

const overviewState = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  maxRegistrants: 100,
  regDeadline: new Date()
};

export default function CreateHackathonPage() {
  const [overview, setOverview] = useState(overviewState);
  const [page, setPage] = useState(PAGES.REGISTRATION);
  const [redirect, setRedirect] = useState(REDIRECT.NONE);

  const drawerPrimary = [
    {
      icon:
        page > PAGES.OVERVIEW ? (
          <CheckCircleIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        ),
      text: "Hackathon Overview",
      onClick: () => setPage(PAGES.OVERVIEW)
    },
    {
      icon:
        page > PAGES.DETAILS ? (
          <CheckCircleIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        ),
      text: "Hackathon Details",
      onClick: () => setPage(PAGES.DETAILS)
    },
    {
      icon:
        page > PAGES.REGISTRATION ? (
          <CheckCircleIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        ),
      text: "Registration Details",
      onClick: () => setPage(PAGES.REGISTRATION)
    },
    {
      icon: <RadioButtonUncheckedIcon />,
      text: "Preview",
      onClick: () => setPage(PAGES.PREVIEW)
    }
  ];

  const drawerSecondary = [
    {
      icon: <SaveIcon />,
      text: "Save and Exit",
      onClick: () => {
        // @TODO: Actually save
        setRedirect(REDIRECT.DASHBOARD);
      }
    },
    {
      icon: <DeleteIcon />,
      text: "Discard and Exit",
      onClick: () => setRedirect(REDIRECT.DASHBOARD)
    }
  ];

  const drawerHeader = (
    <div>
      <Typography variant="h4" component="p">
        Create Hackathon
      </Typography>
      <Typography variant="body1" component="p">
        You're 4 steps away from going live!
      </Typography>
    </div>
  );

  const currPage = () => {
    switch (page) {
      case PAGES.OVERVIEW:
        return (
          <HackathonOverviewForm
            overview={overview}
            setOverview={setOverview}
            nextPage={() => setPage(PAGES.DETAILS)}
            discardAndExit={() => setRedirect(REDIRECT.DASHBOARD)}
          />
        );
      case PAGES.DETAILS:
        return (
          <HackathonDetailsForm
            prvPage={() => setPage(PAGES.OVERVIEW)}
            nextPage={() => setPage(PAGES.REGISTRATION)}
          />
        );
      case PAGES.REGISTRATION:
        return (
          <RegistrationDetailsForm/>
        );
      default:
        return "";
    }
  };

  const currPageTitle = () => {
    switch(page) {
      case PAGES.OVERVIEW:
        return "Hackathon Overview";
      case PAGES.DETAILS:
        return "Hackathon Details";
      case PAGES.REGISTRATION:
        return "Registration Details";
      case PAGES.PREVIEW:
        return "Preview";
      default:
        return "";
    }
  };

  return (
    <Page
      title={currPageTitle()}
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
      drawerSecondary={drawerSecondary}
    >
      {redirect}
      {currPage()}
    </Page>
  );
}
