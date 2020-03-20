import React from "react";
import { connect } from "react-redux";
import { dismissNotification } from "../../redux/actions/notificationActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

/**
 * Snackbar notification area at the bottom of the page displaying
 * global errors and notifications in the application. The notifications
 * are created and dismissed through the redux store, and only one is visible
 * at a time.
 *
 * This is really useful if there are token authentication issues, deletion
 * notifications, etc.
 */
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
