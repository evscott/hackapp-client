import { useEffect } from "react";
import { connect } from "react-redux";
import { getHackathonOverviews } from "../redux/actions/hackOverviewActions";

function Startup(props) {
  // On startup, perform the following actions
  useEffect(() => {
    props.getHackathonOverviews();
  });
  return props.children;
}

export default connect(null, { getHackathonOverviews })(Startup);
