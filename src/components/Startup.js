import { useEffect } from "react";
import { connect } from "react-redux";
import { getHackathonOverviews } from "../redux/actions/hackOverviewActions";
import { getOrg } from "../redux/actions/orgActions";
import { autoSignIn } from "../redux/actions/userActions";

function Startup(props) {
  // On startup, perform the following actions
  useEffect(() => {
    props.getHackathonOverviews();
    props.getOrg();
    props.autoSignIn();
  });
  return props.children;
}

export default connect(null, { getHackathonOverviews, getOrg, autoSignIn })(Startup);
