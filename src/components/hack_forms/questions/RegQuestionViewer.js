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

const useStyles = makeStyles(theme => {
  return {
    content: {
      padding: theme.spacing(4)
    },
    options: {
      padding: 25,
      backgroundColor: theme.palette.grey[50]
    },
    desc: {
      marginTop: 10
    }
  };
});

export default function RegQuestionViewer(props) {
  const classes = useStyles();

  const createCKOptions = () => {
    return (
      <FormGroup>
        {props.regQuestion.options.map((option, idx) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.answers.includes(option)}
                onChange={event => {
                  if (props.answers.includes(event.target.checked)) {
                    props.setAnswers(
                      props.answers.filter(ans => ans !== event.target.value)
                    );
                  } else {
                    props.setAnswers([...props.answers, event.target.value]);
                  }
                }}
                value={option}
              />
            }
            label={option}
            key={idx}
          />
        ))}
      </FormGroup>
    );
  };

  const createRDOptions = () => {
    return (
      <RadioGroup
        name={`Options for ${props.regQuestion.question}`}
        value={props.answers[0]}
        onChange={event => props.setAnswers([event.target.value])}
      >
        {props.regQuestion.options.map((option, idx) => (
          <FormControlLabel
            control={<Radio />}
            label={option}
            key={idx}
            value={option}
          />
        ))}
      </RadioGroup>
    );
  };

  const createTextBox = () => {
    return (
      <TextField
        fullWidth
        multiline
        rows="3"
        label="Answer"
        required={props.regQuestion.required}
        value={props.answers[0]}
        onChange={event => props.setAnswers([event.target.value])}
      />
    );
  };

  const getOptions = () => {
    switch (props.regQuestion.type) {
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
        <Typography variant="h5">{props.regQuestion.question}</Typography>
        <Typography class={classes.desc}>{props.regQuestion.desc}</Typography>
      </div>
      <div className={classes.options}>{getOptions()}</div>
    </div>
  );
}

RegQuestionViewer.propTypes = {
  regQuestion: PropTypes.shape({
    question: PropTypes.string,
    desc: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
    type: PropTypes.string
  }).isRequired,
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired
};
