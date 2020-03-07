import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import RightButtonBar from "../reusable/RightButtonBar";
import OverviewEditor from "./overview/OverviewEditor";

/** The styles pertaining to the component */
const useStyles = makeStyles(theme => {
  return {
    button: {
      marginRight: 10
    }
  };
});

/**
 * A form for asking the user about key information about the hackathon,
 * such as the date, location, time, etc.
 */
export default function HackathonOverviewForm(props) {
  const classes = useStyles();
  return (
    <div>
      <OverviewEditor overview={props.overview} setOverview={props.setOverview}/>
      <RightButtonBar>
        <Button
          className={classes.button}
          onClick={props.discardAndExit}
          size="large"
        >
          Discard and Exit
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={props.nextPage}
        >
          Next
        </Button>
      </RightButtonBar>
    </div>
  );
}

HackathonOverviewForm.propTypes = {
  // The overview object, with all the data to be filled
  overview: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string.isRequired,
    maxRegistrants: PropTypes.number.isRequired,
    regDeadline: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  // The function for setting changes to the overview object
  setOverview: PropTypes.func.isRequired,
  // The function to call to go to the next page
  nextPage: PropTypes.func.isRequired,
  // The function to call to discard the whole hackathon
  discardAndExit: PropTypes.func.isRequired
};
