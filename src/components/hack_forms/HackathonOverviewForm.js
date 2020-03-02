import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import RightButtonBar from "../reusable/RightButtonBar";

const useStyles = makeStyles(theme => {
  return {
    row: {
      display: "flex",
      marginTop: 20,
      marginBottom: 20
    },
    datePicker: {
      flexGrow: 2
    },
    timePicker: {
      flexGrow: 1,
      marginLeft: 10
    },
    marginedTextField: {
      marginTop: 20,
      marginBottom: 0
    },
    textField: {
      marginTop: 0,
      marginBottom: 0
    },
    button: {
      marginRight: 10
    }
  };
});

export default function HackathonOverviewForm(props) {
  const classes = useStyles();
  return (
    <div>
      <TextField
        className={classes.marginedTextField}
        value={props.overview.name}
        onChange={event =>
          props.setOverview({ ...props.overview, name: event.target.value })
        }
        variant={"outlined"}
        required
        fullWidth
        id="name"
        label="Hackathon Name"
        name="name"
        margin="normal"
      />
      <div className={classes.row}>
        <DatePicker
          className={classes.datePicker}
          value={props.overview.startDate}
          onChange={date =>
            props.setOverview({ ...props.overview, startDate: date })
          }
          name="start-date"
          label="Start Date"
          inputVariant="outlined"
          variant="inline"
          autoOk
          required
        />
        <TimePicker
          className={classes.timePicker}
          value={props.overview.startDate}
          onChange={date =>
            props.setOverview({ ...props.overview, startDate: date })
          }
          name="start-time"
          label="Start Time"
          inputVariant="outlined"
          variant="inline"
          autoOk
          required
        />
      </div>
      <div className={classes.row}>
        <DatePicker
          className={classes.datePicker}
          value={props.overview.endDate}
          onChange={date =>
            props.setOverview({ ...props.overview, endDate: date })
          }
          name="end-date"
          label="End Date"
          inputVariant="outlined"
          variant="inline"
          autoOk
          required
        />
        <TimePicker
          className={classes.timePicker}
          value={props.overview.endDate}
          onChange={date =>
            props.setOverview({ ...props.overview, endDate: date })
          }
          name="end-time"
          label="End Time"
          inputVariant="outlined"
          variant="inline"
          autoOk
          required
        />
      </div>
      <TextField
        className={classes.textField}
        value={props.overview.location}
        onChange={event =>
          props.setOverview({ ...props.overview, location: event.target.value })
        }
        variant="outlined"
        required
        fullWidth
        id="location"
        label="Location"
        name="location"
        margin="normal"
      />
      <TextField
        className={classes.marginedTextField}
        value={props.overview.maxRegistrants}
        onChange={event => {
          const value = parseInt(event.target.value);
          // Ensure that we have a positive number of registrants
          if (!isNaN(value) && value > 0) {
            props.setOverview({
              ...props.overview,
              maxRegistrants: value
            });
          }
        }}
        variant="outlined"
        required
        fullWidth
        id="max-registrants"
        label="Max Registrants"
        name="max-registrants"
        margin="normal"
      />
      <div className={classes.row}>
        <DatePicker
          className={classes.datePicker}
          value={props.overview.regDeadline}
          onChange={date =>
            props.setOverview({ ...props.overview, regDeadline: date })
          }
          name="registration-deadline-date"
          label="Registration Deadline Date"
          inputVariant="outlined"
          variant="inline"
          autoOk
          required
        />
        <TimePicker
          className={classes.timePicker}
          value={props.overview.regDeadline}
          onChange={date =>
            props.setOverview({ ...props.overview, regDeadline: date })
          }
          name="registration-deadline-time"
          label="Registration Deadline Time"
          inputVariant="outlined"
          variant="inline"
          autoOk
          required
        />
      </div>
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
  overview: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string.isRequired,
    maxRegistrants: PropTypes.number.isRequired,
    regDeadline: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  setOverview: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  discardAndExit: PropTypes.func.isRequired
};
