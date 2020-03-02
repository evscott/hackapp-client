import React, { useState } from "react";
import PropTypes from "prop-types";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import MdEditor from "./markdown/MdEditor";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

export default function HackathonDetailsForm(props) {
  const [detailSections, setDetailSections] = useState([
    "# What the Hack?",
    "Heck"
  ]);
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
      array={detailSections}
      setArray={setDetailSections}
      prvPage={props.prvPage}
      nextPage={props.nextPage}
      getCardContents={index => (
        <MdEditor
          text={detailSections[index]}
          setText={newDetailSection => {
            const newDetailSections = [...detailSections];
            newDetailSections[index] = newDetailSection;
            setDetailSections(newDetailSections);
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
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};
