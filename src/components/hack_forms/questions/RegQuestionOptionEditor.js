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

const useStyles = makeStyles(theme => {
  return {
    root: {
      // marginTop: theme.spacing(4)
    },
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

export default function RegQuestionOptionEditor(props) {
  const classes = useStyles();

  const handleEdit = (event, index) => {
    const newOptions = [...props.options];
    if (index === props.options.length) {
      newOptions.push(event.target.value);
    } else {
      newOptions[index] = event.target.value;
    }
    props.setRegOptions(newOptions);
  };

  const handleIconClicked = index => {
    const newOptions = [...props.options];
    if (index === props.options.length) {
      newOptions.push("");
    } else {
      newOptions.splice(index, 1);
    }
    props.setRegOptions(newOptions);
  };

  const createTextField = index => {
    return (
      <TextField
        className={classes.textField}
        id={`option-${index + 1}`}
        name={`option-${index + 1}`}
        label={`Option ${index + 1}`}
        value={index < props.options.length ? props.options[index] : ""}
        onChange={event => handleEdit(event, index)}
      />
    );
  };

  const getIcon = index => {
    if (index === props.options.length) {
      return <AddCircleIcon fontSize="small" />;
    } else {
      return <RemoveCircleIcon fontSize="small" />;
    }
  };

  const createCKOptions = () => {
    return (
      <FormGroup className={classes.root}>
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

  const createRDOptions = () => {
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
  type: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setRegOptions: PropTypes.func.isRequired
};
