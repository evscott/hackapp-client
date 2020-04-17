import { ERROR, NOTIFICATION, DISMISS_NOTIFICATION } from "./actionTypes";

/** Action for showing an error message to the user */
export const showError = message => ({
  type: ERROR,
  message
});

/** Action for showing a notification to the user */
export const showNotification = message => ({
  type: NOTIFICATION,
  message
});

/** Action for dismissing the notification on screen */
export const dismissNotification = () => ({
  type: DISMISS_NOTIFICATION
});
