/**
 * Converts the detail objects received from the server to a format
 * usable by the redux store.
 *
 * @param detailsToUpdate Array of detail objects from the server
 * @param oldDetails The old dictionary of details from the redux store
 * @returns {Array} Detail objects for the redux store
 */
export const convertDetailsFromServerToRedux = (
  detailsToUpdate,
  oldDetails
) => {
  const details = { ...oldDetails };
  detailsToUpdate.forEach(item => {
    details[item.did] = item;
  });
  return details;
};

/**
 * Converts the detail objects stored in the redux store to a format
 * which can be used by the UI (i.e., in a sorted array).
 *
 * @param details The details stored in a dictionary in the redux store
 * @returns {Array} The details ready for the GUI uses
 */
export const convertDetailsFromReduxToUI = details => {
  if(!details) return undefined;
  // Unpack the details into an array
  return Object.values(details).sort((d1, d2) => {
    if(d1.index < d2.index) return -1;
    else if(d1.index > d2.index) return 1;
    return 0;
  });
};

/**
 * Converts the detail objects created on the GUI to a format usable for
 * sending to the server.
 *
 * @param details Array of strings representing the details
 * @returns {Array} Detail objects for the server
 */
export const convertDetailsFromUIToServer = details => {
  return details.map((detail, index) => {
    detail.index = index;
    return detail;
  });
};
