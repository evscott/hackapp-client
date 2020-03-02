import React, { useState } from "react";
import PropTypes from "prop-types";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import MdEditor from "./markdown/MdEditor";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

export default function HackathonDetailsForm(props) {
  const [viewMode, setViewMode] = useState(false);

  const speedDialItems = [
    {
      icon: <SubjectIcon />,
      title: "Add Text",
      getNewItem: () => ""
    },
    {
      icon: <ImageIcon />,
      title: "Add Image",
      getNewItem: () => ""
    }
  ];

  return (
    <ReorderableCardForm
      array={props.details}
      setArray={props.setDetails}
      prvPage={props.prvPage}
      nextPage={props.nextPage}
      getCardContents={index => (
        <MdEditor
          text={props.details[index]}
          setText={newDetail => {
            const newDetails = [...props.details];
            newDetails[index] = newDetail;
            props.setDetails(newDetails);
          }}
          view={viewMode}
        />
      )}
      speedDialItems={speedDialItems}
      speedDialHidden={viewMode}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  );
}

HackathonDetailsForm.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  setDetails: PropTypes.func.isRequired,
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};
