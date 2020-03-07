import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  PAGE_ICONS,
  PAGE_TITLES,
  PAGES,
  PAGES_LIST
} from "../create_hackathon/CreateHackathonSubpages";
import { largeDrawerWidth } from "../page/Drawer";
import ReorderableCardForm from "../reusable/ReorderableCardForm";
import RegQuestionEditor from "./questions/RegQuestionEditor";
import MdEditor from "./markdown/MdEditor";

const useStyles = makeStyles(theme => {
  return {
    bottomNav: {
      position: "fixed",
      bottom: theme.spacing(3),
      left: theme.spacing(3),
      right: theme.spacing(3),
      backgroundColor: theme.palette.grey[100],
      [theme.breakpoints.up("md")]: {
        left: largeDrawerWidth + theme.spacing(3)
      }
    }
  };
});

/**
 * A view-only set of forms for previewing the hackathon information.
 */
export default function HackathonPreviewForm(props) {
  const classes = useStyles();
  // Which preview page to show
  const [page, setPage] = React.useState(PAGES.OVERVIEW);
  // A list of pages to preview (excluding the preview—you can't preview the
  // preview page, since that would be a recursive mess!)
  const pagesWithoutPreview = PAGES_LIST.filter(pg => pg !== PAGES.PREVIEW);

  /** Gets a read-only preview of the hackathon details. */
  const previewDetails = () => {
    return (
      <ReorderableCardForm
        array={props.details}
        getCardContents={index => (
          <MdEditor
            text={props.details[index]}
            viewMode
          />
        )}
        viewMode
      />
    );
  };

  /** Gets a read-only preview of the hackathon questions. */
  const previewRegQuestions = () => {
    return (
      <ReorderableCardForm
        array={props.questions}
        getCardContents={index => (
          <RegQuestionEditor
            question={props.questions[index]}
            viewMode
          />
        )}
        viewMode
      />
    );
  };

  /** Gets the current page to preview. */
  const getPage = () => {
    switch (page) {
      case PAGES.DETAILS:
        return previewDetails();
      case PAGES.REGISTRATION:
        return previewRegQuestions();
      default:
        return "";
    }
  };

  return (
    <div>
      {getPage()}
      <BottomNavigation
        className={classes.bottomNav}
        value={page}
        onChange={(event, newValue) => setPage(newValue)}
        showLabels
      >
        {pagesWithoutPreview.map(pg => (
          <BottomNavigationAction
            label={PAGE_TITLES[pg]}
            value={pg}
            key={pg}
            icon={PAGE_ICONS[pg]}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

HackathonPreviewForm.propTypes = {
  // The questions for the registration form, which is an array of
  // objects
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      required: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  // The list of markdown text strings
  details: PropTypes.arrayOf(PropTypes.string).isRequired
};
