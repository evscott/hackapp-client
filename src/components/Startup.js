import { useEffect } from "react";
import { connect } from "react-redux";
import { getHackathons } from "../redux/actions/hackathonActions";

function Startup(props) {
  // On startup, perform the following actions
  useEffect(() => {
    props.getHackathons();
  });
  return props.children;
}

export default connect(null, { getHackathons })(Startup);
