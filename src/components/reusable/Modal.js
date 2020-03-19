import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

/** Styles for the react component */
const useStyles = makeStyles(theme => {
  return {
    modal: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      outline: 0
    },
    card: {
      width: "calc(100% - 32px)",
      maxWidth: 800,
      position: "absolute",
      top: 90,
      bottom: -5,
      outline: 0,
      overflowY: "auto"
    },
    cardContent: {
      margin: "auto",
      paddingTop: 70,
      width: "90%",
      maxWidth: 650,
      maxHeight: "50%"
    },
    closeIcon: {
      position: "absolute",
      top: 10,
      left: 10
    }
  };
});

/**
 * A styled component for a scrollable modal in a Card.
 */
export default function MegaModal(props) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <Card className={classes.card}>
        <IconButton className={classes.closeIcon}>
          <CloseIcon
            fontSize="large"
            onClick={() => props.setOpen(false)}
          />
        </IconButton>
        <div className={classes.cardContent}>{props.children}</div>
      </Card>
    </Modal>
  );
}

MegaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};
