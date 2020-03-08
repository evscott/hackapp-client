import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Page from "../page/Page";
import Typography from "@material-ui/core/Typography";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import HackathonOverviewForm from "../hack_forms/HackathonOverviewForm";
import HackathonDetailsForm from "../hack_forms/HackathonDetailsForm";
import { DASHBOARD_ROUTE } from "../../routes";
import RegistrationDetailsForm from "../hack_forms/RegistrationDetailsForm";
import { QUESTION_TYPE } from "../hack_forms/questions/QuestionType";
import { PAGES, PAGE_TITLES, PAGES_LIST } from "./CreateHackathonSubpages";
import HackathonPreviewForm from "../hack_forms/HackathonPreviewForm";

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

/**
 * The page for creating a hackathon. It has forms for editing the
 * hackathon overview, details, and registration questions.
 */
export default function CreateHackathonPage() {
  // The overview data for the hackathon
  const [overview, setOverview] = useState(overviewState);
  // The details data for the hackathon (array of markdown)
  const [details, setDetails] = useState(detailsState);
  // The questions for registration
  const [questions, setQuestions] = useState(questionsState);
  // The page we are currently looking at
  const [page, setPage] = useState(PAGES.OVERVIEW);
  // When we redirect, we set the state here
  const [redirect, setRedirect] = useState(REDIRECT.NONE);

  /**
   * The primary buttons in the left drawer. These have links
   * to all of the different subpages (overview, details,
   * registration, preview). Each button has an icon, text,
   * and an onClick function to call. This is passed as input
   * to the Page, which styles it according to its template.
   */
  const drawerPrimary = PAGES_LIST.map(pg => {
    return {
      icon: page > pg ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />,
      text: PAGE_TITLES[pg],
      onClick: () => setPage(pg),
      highlighted: page === pg
    };
  });

  /**
   * The secondary buttons in the left drawer for saving,
   * trashing, and exiting the Create Hackathon flow.
   */
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

  /** The number of steps away from completing the hackathon. */
  const numStepsAway = PAGES.PREVIEW + 1 - page;

  /**
   * The header for the drawer with some information.
   */
  const drawerHeader = (
    <div>
      <Typography variant="h4" component="p">
        Create Hackathon
      </Typography>
      <Typography variant="body1" component="p">
        You're {numStepsAway} step{numStepsAway === 1 ? "" : "s"} away from
        going live!
      </Typography>
    </div>
  );

  /** The current subpage, with the corresponding form. */
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
      case PAGES.PREVIEW:
        return (
          <HackathonPreviewForm
            questions={questions}
            details={details}
            overview={overview}
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
