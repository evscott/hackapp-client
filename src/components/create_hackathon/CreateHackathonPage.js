import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import { QUESTION_TYPE } from "../hack_forms/questions/QuestionType";

/** The distinct pages for creating hackathons, in order. */
const PAGES = {
  OVERVIEW: 1,
  DETAILS: 2,
  REGISTRATION: 3,
  PREVIEW: 4
};

/**
 * The titles for each page. Can be indexed using PAGE_TITLES[page],
 * where page is an integer.
 */
const PAGE_TITLES = {
  [PAGES.OVERVIEW]: "Overview",
  [PAGES.DETAILS]: "Details",
  [PAGES.REGISTRATION]: "Registration",
  [PAGES.PREVIEW]: "Preview"
};

/**
 * The possible redirects from this page for React Router.
 * If redirected, we go to a new page route without rendering this page.
 */
const REDIRECT = {
  NONE: "",
  DASHBOARD: <Redirect to={DASHBOARD_ROUTE} />
};

/** The initial state for the hackathon overview. */
const overviewState = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  maxRegistrants: 100,
  regDeadline: new Date()
};

/**
 * The initial state for the hackathon details page.
 * It's a list of markdown strings.
 */
const detailsState = ["# What the Hack?"];

/** The initial set of questions for registration. */
const questionsState = [
  {
    question: "",
    desc: "",
    options: [],
    required: false,
    type: QUESTION_TYPE.TXT
  }
];

export default function CreateHackathonPage() {
  const [overview, setOverview] = useState(overviewState);
  const [details, setDetails] = useState(detailsState);
  const [questions, setQuestions] = useState(questionsState);
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
            details={details}
            setDetails={setDetails}
            prvPage={() => setPage(PAGES.OVERVIEW)}
            nextPage={() => setPage(PAGES.REGISTRATION)}
          />
        );
      case PAGES.REGISTRATION:
        return (
          <RegistrationDetailsForm
            questions={questions}
            setQuestions={setQuestions}
            prvPage={() => setPage(PAGES.DETAILS)}
            nextPage={() => setPage(PAGES.PREVIEW)}
          />
        );
      default:
        return "";
    }
  };

  return (
    <Page
      title={PAGE_TITLES[page]}
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
      drawerSecondary={drawerSecondary}
    >
      {redirect}
      {currPage()}
    </Page>
  );
}
