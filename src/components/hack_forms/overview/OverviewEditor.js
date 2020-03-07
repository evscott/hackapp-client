import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateTimePicker from "./DateTimePicker";

/** The styles pertaining to the component */
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

/**
 * A form for asking the user about key information about the hackathon,
 * such as the date, location, time, etc.
 */
export default function OverviewEditor(props) {
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
        margin="normal"
      />
      <DateTimePicker
        dateTime={props.overview.startDate}
        setDateTime={date =>
          props.setOverview({ ...props.overview, startDate: date })
        }
        name="Start"
      />
      <DateTimePicker
        dateTime={props.overview.endDate}
        setDateTime={date =>
          props.setOverview({ ...props.overview, endDate: date })
        }
        name="End"
      />
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
          let value = parseInt(event.target.value);
          if(event.target.value === "") {
            value = 0;
          }
          // Ensure that we have a non-negative number of registrants
          if (!isNaN(value) && value >= 0) {
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
      <DateTimePicker
        dateTime={props.overview.regDeadline}
        setDateTime={date =>
          props.setOverview({ ...props.overview, regDeadline: date })
        }
        name="Registration Deadline"
      />
    </div>
  );
}

OverviewEditor.propTypes = {
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
  setOverview: PropTypes.func.isRequired
};
