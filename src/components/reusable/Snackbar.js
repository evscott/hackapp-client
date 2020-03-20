import React from "react";
import { connect } from "react-redux";
import { dismissNotification } from "../../redux/actions/notificationActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function AlertSnackbar(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.dismissNotification}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Alert onClose={props.dismissNotification} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = state => ({
  open: state.notifications.notificationVisible,
  severity: state.notifications.severity,
  message: state.notifications.message
});

export default connect(mapStateToProps, { dismissNotification })(AlertSnackbar);
