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
import MdEditor from "./details/MdEditor";
import HackathonCard from "../dashboard/HackathonCard";

const useStyles = makeStyles(theme => {
  return {
    bottomNav: {
      position: "static",
      marginTop: 20,
      borderRadius: 4,
      backgroundColor: theme.palette.grey[100],
      [theme.breakpoints.up("md")]: {
        left: largeDrawerWidth + theme.spacing(3)
      }
    },
    navigationAction: {
      maxWidth: 200
    }
  };
});

/**
 * A view-only set of forms for previewing the hackathon information.
 */
export default function HackathonPreviewForm(props) {
  const classes = useStyles();
  // Which preview page to show
  let [page, setPage] = React.useState(PAGES.OVERVIEW);
  if (props.page && props.setPage) {
    page = props.page;
    setPage = props.setPage
  }
  // A list of pages to preview (excluding the preview—you can't preview the
  // preview page, since that would be a recursive mess!)
  const pagesWithoutPreview = PAGES_LIST.filter(pg => pg !== PAGES.PREVIEW);

  /** Gets a read-only preview of the hackathon overview. */
  const previewOverview = () => {
    return (
      <HackathonCard overview={props.overview}/>
    )
  };

  /** Gets a read-only preview of the hackathon details. */
  const previewDetails = () => {
    return (
      <ReorderableCardForm
        array={props.details}
        key="preview-details" // Key required to avoid React errors reusing components
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
        key="preview-questions"
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
      case PAGES.OVERVIEW:
        return previewOverview();
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
      <BottomNavigation
        className={classes.bottomNav}
        value={page}
        onChange={(event, newValue) => setPage(newValue)}
        showLabels
      >
        {pagesWithoutPreview.map(pg => (
          <BottomNavigationAction
            className={classes.navigationAction}
            label={PAGE_TITLES[pg]}
            value={pg}
            key={pg}
            icon={PAGE_ICONS[pg]}
          />
        ))}
      </BottomNavigation>
      {getPage()}
    </div>
  );
}

HackathonPreviewForm.propTypes = {
  // The overview object, with all the general data to be show
  overview: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string.isRequired,
    maxReg: PropTypes.number.isRequired,
    regDeadline: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  // The questions for the registration form, which is an array of
  // objects
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      required: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  // The list of markdown text strings
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  // The page to preview
  // (if supplied, this becomes a controlled component)
  page: PropTypes.number,
  // The function to move between pages
  // (if supplied, this becomes a controlled component)
  setPage: PropTypes.func
};
