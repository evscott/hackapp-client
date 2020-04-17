const SETUP_ROUTE = "/setup";
const DASHBOARD_ROUTE = "/";
const CREATE_HACKATHON_ROUTE = "/create";
const CREATE_HACKATHON_PREXISTING_ROUTE = "/create/:hid";
const VIEW_HACKATHON_ROUTE = "/hack/:hid";
const viewHackathonRouteFor = hid => `/hack/${hid}`;

export {
  SETUP_ROUTE,
  DASHBOARD_ROUTE,
  CREATE_HACKATHON_ROUTE,
  CREATE_HACKATHON_PREXISTING_ROUTE,
  VIEW_HACKATHON_ROUTE,
  viewHackathonRouteFor
};
