import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../page/Page";
import Typography from "@material-ui/core/Typography";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import HackathonOverviewForm from "../hack_forms/HackathonOverviewForm";
import HackathonDetailsForm from "../hack_forms/HackathonDetailsForm";

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

const overviewState = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  maxRegistrants: 100,
  regDeadline: new Date()
};

const drawerSecondary = [
  {
    icon: <SaveIcon />,
    text: "Save and Exit"
  },
  {
    icon: <DeleteIcon />,
    text: "Discard and Exit"
  }
];

export default function CreateHackathonPage() {
  const [overview, setOverview] = useState(overviewState);
  const [page, setPage] = useState(PAGES.OVERVIEW);

  const drawerPrimary = [
    {
      icon:
        page > PAGES.OVERVIEW ? (
          <CheckCircleIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        ),
      text: "Hackathon Overview"
    },
    {
      icon:
        page > PAGES.DETAILS ? (
          <CheckCircleIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        ),
      text: "Hackathon Details"
    },
    {
      icon:
        page > PAGES.REGISTRATION ? (
          <CheckCircleIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        ),
      text: "Registration Details"
    },
    {
      icon: <RadioButtonUncheckedIcon />,
      text: "Preview"
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
    return (<HackathonDetailsForm
      prvPage={() => setPage(PAGES.OVERVIEW)}
      nextPage={() => setPage(PAGES.REGISTRATION)}
    />);
    switch (page) {
      case PAGES.OVERVIEW:
        return (
          <HackathonOverviewForm
            overview={overview}
            setOverview={setOverview}
            nextPage={() => setPage(PAGES.DETAILS)}
            discardAndExit={() => console.log("Exit...")}
          />
        );
      case PAGES.DETAILS:
        return (
          <HackathonDetailsForm
            prvPage={() => setPage(PAGES.OVERVIEW)}
            nextPage={() => setPage(PAGES.REGISTRATION)}
          />
        );
      default:
        return "";
    }
  };

  return (
    <Page
      title="Hackathon Overview"
      drawerHeader={drawerHeader}
      drawerPrimary={drawerPrimary}
      drawerSecondary={drawerSecondary}
    >
      {currPage()}
    </Page>
  );
}
