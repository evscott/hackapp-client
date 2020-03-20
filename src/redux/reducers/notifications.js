import {
  NOTIFICATION,
  ERROR,
  DISMISS_NOTIFICATION
} from "../actions/actionTypes";

/**
 * The various severity levels for a notification.
 * These are defined by material-ui.
 */
const SEVERITY = {
  SUCCESS: "success",
  INFO: "info",
  ERROR: "error",
  WARNING: "warning"
};

/**
 * The initial state for the branch of the Redux state tree.
 * It has whether the notification is visible, the severity (i.e.,
 * the type of notification), and the message for the notification.
 */
const initialState = {
  notificationVisible: true,
  severity: SEVERITY.INFO,
  message: "Welcome back to Hackapp!"
};

/**
 * Reducer for the notifications branch of the redux state tree.
 * Takes actions that create notifications (or hides them) and
 * adds them to the state tree for display on any page.
 * @param state The currently displayed notification (if any)
 * @param action The notification to create/dismiss
 */
export default function notifications(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION:
      return {
        notificationVisible: true,
        severity: SEVERITY.INFO,
        message: action.message
      };
    case ERROR:
      return {
        notificationVisible: true,
        severity: SEVERITY.ERROR,
        message: action.message
      };
    case DISMISS_NOTIFICATION:
      return {
        notificationVisible: false,
        severity: SEVERITY.INFO,
        message: ""
      };
    default:
      return state;
  }
}
