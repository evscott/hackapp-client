import React, { useState } from "react";
import PropTypes from "prop-types";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import MdEditor from "./markdown/MdEditor";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

/**
 * A form that asks the user to create a markdown-style collection
 * of cards that describe the hackathon. It should be an exhaustive
 * collection of text items that need to be shown to somebody who is going
 * to register for the hackathon.
 */
export default function HackathonDetailsForm(props) {
  // Hold whether or not we are previewing
  const [viewMode, setViewMode] = useState(false);

  /**
   * The controls available to the user when adding cards with
   * hackathon details.
   */
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
          viewMode={viewMode}
        />
      )}
      speedDialItems={speedDialItems}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  );
}

HackathonDetailsForm.propTypes = {
  // The list of markdown text strings
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  // A function that sets the details
  setDetails: PropTypes.func.isRequired,
  // Function to go to the previous page
  prvPage: PropTypes.func.isRequired,
  // Function to go to the next page
  nextPage: PropTypes.func.isRequired
};
