import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
import { QUESTION_TYPE } from "./QuestionType";

/** Creates the styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    formItem: {
      display: "flex",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    textField: {
      flexGrow: 1,
      position: "relative",
      top: -8
    }
  };
});

/**
 * An editor that allows the user to create options for a question,
 * whether it is a list of checkboxes or radio buttons. It is not
 * visible when we are working with a question that has text input
 * because in such a case, no options are needed.
 */
export default function RegQuestionOptionEditor(props) {
  const classes = useStyles();

  /**
   * Handles what happens when we edit an option. If we edited a
   * pre-existing option, we simply replace the old value and pass
   * it to the parent. However, if we edited a new option, we need
   * to add the new option.
   */
  const handleEdit = (event, index) => {
    const newOptions = [...props.options];
    if (index === props.options.length) {
      newOptions.push(event.target.value);
    } else {
      newOptions[index] = event.target.value;
    }
    props.setRegOptions(newOptions);
  };

  /**
   * Handles when an option's icon is clicked. If it is the last
   * option (i.e., the "add new" option), it adds a new option.
   * Otherwise, it deletes the option (in accordance with the icon's
   * appearance: delete vs add).
   */
  const handleIconClicked = index => {
    const newOptions = [...props.options];
    if (index === props.options.length) {
      // Add new option
      newOptions.push("");
    } else {
      // Delete the option
      newOptions.splice(index, 1);
    }
    props.setRegOptions(newOptions);
  };

  /** Creates a new text field for the option. */
  const createTextField = index => {
    return (
      <TextField
        className={classes.textField}
        name={`option-${index + 1}`}
        label={`Option ${index + 1}`}
        value={index < props.options.length ? props.options[index] : ""}
        onChange={event => handleEdit(event, index)}
      />
    );
  };

  /** Gets the icon to display for the option (add or delete, depending). */
  const getIcon = index => {
    if (index === props.options.length) {
      return <AddCircleIcon fontSize="small" />;
    } else {
      return <RemoveCircleIcon fontSize="small" />;
    }
  };

  /**
   * Creates a list of checkbox options with a series of checkboxes. There
   * is one more option visible than the actual number that exist; the last
   * one is there for creating new ones.
   */
  const createCKOptions = () => {
    // Displays all options, plus one extra (the empty string) which is for
    // adding additional options in the editor
    return (
      <FormGroup>
        {[...props.options, ""].map((option, idx) => (
          <div className={classes.formItem} key={idx}>
            <Checkbox checked={false} />
            {createTextField(idx)}
            <IconButton onClick={() => handleIconClicked(idx)}>
              {getIcon(idx)}
            </IconButton>
          </div>
        ))}
      </FormGroup>
    );
  };

  /**
   * Creates a list of radio button options with a series of radio buttons.
   * There is one extra option visible, which is for adding more options.
   */
  const createRDOptions = () => {
    // Displays all options, plus one extra (the empty string) which is for
    // adding additional options in the editor
    return (
      <RadioGroup>
        {[...props.options, ""].map((option, idx) => (
          <div className={classes.formItem} key={idx}>
            <Radio value={false} />
            {createTextField(idx)}
            <IconButton onClick={() => handleIconClicked(idx)}>
              {getIcon(idx)}
            </IconButton>
          </div>
        ))}
      </RadioGroup>
    );
  };

  // Depending on the type of question, show different options.
  switch (props.type) {
    case QUESTION_TYPE.CK:
      return createCKOptions();
    case QUESTION_TYPE.RD:
      return createRDOptions();
    default:
      return "";
  }
}

RegQuestionOptionEditor.propTypes = {
  // The type of the question (radio button, checkbox, text)
  type: PropTypes.string.isRequired,
  // The options for the question
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  // A setter for the options of the question
  setRegOptions: PropTypes.func.isRequired
};
