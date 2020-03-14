const SETUP_ROUTE = "/setup";
const DASHBOARD_ROUTE = "/dashboard";
const CREATE_HACKATHON_ROUTE = "/create";
const CREATE_HACKATHON_PREXISTING_ROUTE = "/create/:hid";
const createHackathonRouteFor = (hid) => `/create/${hid}`;

export {
  SETUP_ROUTE,
  DASHBOARD_ROUTE,
  CREATE_HACKATHON_ROUTE,
  CREATE_HACKATHON_PREXISTING_ROUTE,
  createHackathonRouteFor
}
