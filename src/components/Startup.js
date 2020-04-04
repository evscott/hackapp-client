import { useEffect } from "react";
import { connect } from "react-redux";
import { getHackathonOverviews } from "../redux/actions/hackOverviewActions";
import { getOrg } from "../redux/actions/orgActions";

function Startup(props) {
  // On startup, perform the following actions
  useEffect(() => {
    props.getHackathonOverviews();
    props.getOrg();
  });
  return props.children;
}

export default connect(null, { getHackathonOverviews, getOrg })(Startup);
