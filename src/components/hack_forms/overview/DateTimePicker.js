import { DatePicker, TimePicker } from "@material-ui/pickers";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

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
    }
  };
});

/**
 * A nice date-and-time picker that fills an entire row with the options.
 * It's a lightly styled wrapper for the Material-UI pickers.
 */
export default function DateTimePicker(props) {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <DatePicker
        className={classes.datePicker}
        value={props.dateTime}
        onChange={date => props.setDateTime(date)}
        label={`${props.name} Date`}
        inputVariant="outlined"
        variant="inline"
        autoOk
        required
      />
      <TimePicker
        className={classes.timePicker}
        value={props.dateTime}
        onChange={date => props.setDateTime(date)}
        label={`${props.name} Time`}
        inputVariant="outlined"
        variant="inline"
        autoOk
        required
      />
    </div>
  );
}

DateTimePicker.propTypes = {
  // The date object to change
  dateTime: PropTypes.instanceOf(Date).isRequired,
  // The function for setting changes to the date selected
  setDateTime: PropTypes.func.isRequired,
  // The name of the date to select, like "Registration Deadline"
  name: PropTypes.string.isRequired
};
