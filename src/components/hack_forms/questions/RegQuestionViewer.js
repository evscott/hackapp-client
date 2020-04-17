import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { QUESTION_TYPE } from "./QuestionType";

/** The styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    content: {
      padding: theme.spacing(4)
    },
    options: {
      padding: 25,
      backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50]
    },
    desc: {
      marginTop: 10
    }
  };
});

/**
 * A viewer for a given registration question, showing the title,
 * description, and options. The options are clickable and the selections
 * are passed to the parent.
 */
export default function RegQuestionViewer(props) {
  const classes = useStyles();

  /** Creates a group of checkmark options. */
  const createCKOptions = () => {
    return (
      <FormGroup>
        {props.question.options.map(item => (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.answers.oid.includes(item.oid)}
                onChange={event => {
                  if (props.answers.oid.includes(event.target.value)) {
                    props.setAnswers({
                      ...props.answers,
                      oid: props.answers.oid.filter(
                        oid => oid !== event.target.value
                      )
                    });
                  } else {
                    props.setAnswers({
                      ...props.answers,
                      oid: [...props.answers.oid, event.target.value]
                    });
                  }
                }}
                value={item.oid}
              />
            }
            label={item.option}
            key={item.oid}
          />
        ))}
      </FormGroup>
    );
  };

  /** Creates a group of radio button options. */
  const createRDOptions = () => {
    return (
      <RadioGroup
        name={`Options for ${props.question.question}`}
        value={props.answers.oid[0]}
        onChange={event =>
          props.setAnswers({ ...props.answers, oid: [event.target.value] })
        }
      >
        {props.question.options.map(item => (
          <FormControlLabel
            control={<Radio />}
            label={item.option}
            key={item.oid}
            value={item.oid}
          />
        ))}
      </RadioGroup>
    );
  };

  /** Creates a text box for text input, if that is needed. */
  const createTextBox = () => {
    return (
      <TextField
        fullWidth
        multiline
        rows="3"
        label="Answer"
        required={props.question.required}
        value={props.answers.answer}
        onChange={event =>
          // Update the answer
          props.setAnswers({ ...props.answers, answer: event.target.value })
        }
      />
    );
  };

  /** Gets the options for the given question's type. */
  const getOptions = () => {
    switch (props.question.type) {
      case QUESTION_TYPE.CK:
        return createCKOptions();
      case QUESTION_TYPE.RD:
        return createRDOptions();
      default:
        return createTextBox();
    }
  };

  return (
    <div>
      <div className={classes.content}>
        <Typography variant="h5">{props.question.question}</Typography>
        <Typography className={classes.desc}>{props.question.desc}</Typography>
      </div>
      <div className={classes.options}>{getOptions()}</div>
    </div>
  );
}

RegQuestionViewer.propTypes = {
  // A registration question option
  question: PropTypes.shape({
    // The string representation of the question
    question: PropTypes.string.isRequired,
    // The description of the question
    desc: PropTypes.string.isRequired,
    // The options to choose from for the question
    options: PropTypes.array.isRequired,
    // Whether filling out the question is required
    required: PropTypes.bool.isRequired,
    // The type of the question (multiple choice, radio, text)
    type: PropTypes.string.isRequired
  }).isRequired,
  // The answers the user has selected for the question
  answers: PropTypes.object.isRequired,
  // A setter for the answers a user has selected for the question
  setAnswers: PropTypes.func.isRequired
};
