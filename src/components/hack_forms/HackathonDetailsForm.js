import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import SubjectIcon from "@material-ui/icons/Subject";
import ImageIcon from "@material-ui/icons/Image";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./markdown/mde-override-styles.css";
import MdEditor from "./markdown/MdEditor";
import ReorderableCardForm from "../reusable/ReorderableCardForm";

const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 1051
    },
    icon: {
      marginRight: 10
    },
    fabContents: {
      display: "flex",
      alignItems: "center"
    },
    button: {
      marginRight: 10
    },
    spacer: {
      marginBottom: 40
    }
  };
});

export default function HackathonDetailsForm(props) {
  const classes = useStyles();

  const [detailSections, setDetailSections] = useState(["# What the Hack?", "Heck"]);
  const [viewMode, setViewMode] = useState(false);

  const getFab = () => {
    return (
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => setViewMode(!viewMode)}
        variant="extended"
      >
        {viewMode ? (
          <div className={classes.fabContents}>
            <EditIcon className={classes.icon} />
            <Typography variant="button" display="inline">
              Edit
            </Typography>
          </div>
        ) : (
          <div className={classes.fabContents}>
            <VisibilityIcon className={classes.icon} />
            <Typography variant="button" display="inline">
              Preview
            </Typography>
          </div>
        )}
      </Fab>
    );
  };

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
      getCardContents={(index) => (
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
      fab={getFab()}
    />
  );
}

HackathonDetailsForm.propTypes = {
  prvPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};
