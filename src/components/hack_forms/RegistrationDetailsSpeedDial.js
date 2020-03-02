import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { QUESTION_TYPE } from "./questions/QuestionType";
import RightSpeedDial from "../reusable/RightSpeedDial";

export default function RegistrationDetailsSpeedDial(props) {
  return (
    <RightSpeedDial hidden={props.hidden}>
      <SpeedDialAction
        icon={<SubjectIcon />}
        tooltipTitle={`Add ${QUESTION_TYPE.TXT} Question`}
        onClick={() => props.addQuestion(QUESTION_TYPE.TXT)}
      />
      <SpeedDialAction
        icon={<RadioButtonCheckedIcon />}
        tooltipTitle={`Add ${QUESTION_TYPE.RD} Question`}
        onClick={() => props.addQuestion(QUESTION_TYPE.RD)}
      />
      <SpeedDialAction
        icon={<CheckBoxIcon />}
        tooltipTitle={`Add ${QUESTION_TYPE.CK} Question`}
        onClick={() => props.addQuestion(QUESTION_TYPE.CK)}
      />
    </RightSpeedDial>
  );
}

RegistrationDetailsSpeedDial.propTypes = {
  hidden: PropTypes.bool,
  addQuestion: PropTypes.func.isRequired
};
