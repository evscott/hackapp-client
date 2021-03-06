import React from "react";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import SetupOrgForm from "./SetupOrgForm";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import { createOrg } from "../../redux/actions/orgActions";
import { DASHBOARD_ROUTE } from "../../routes";
import UserForm from "../signin_forms/UserForm";
import AlertSnackbar from "../reusable/Snackbar";

/** The index for the register a new admin page. */
const REGISTER_ADMIN_PAGE = 0;
/** The index for the set organization name page. */
const SET_ORGANIZATION = 1;
/** The index for the redirect to the dashboard. */
const REDIRECT = {
  NONE: "",
  DASHBOARD: <Redirect push to={DASHBOARD_ROUTE} />
};

/**
 * This defines the styles for the React component.
 */
const useStyles = makeStyles(theme => {
  return {
    main: {
      padding: "0",
      maxWidth: "none"
    },
    megaHeader: {
      paddingTop: "150px",
      paddingBottom: "20px",
      maxWidth: "none",
      backgroundColor: theme.palette.primary.main,
      color: "#FFF"
    },
    animatingBox: {
      position: "relative",
      display: "flex",
      justifyContent: "center"
    },
    centeredTitle: {
      textAlign: "center",
      width: "100%"
    },
    slide: {
      margin: 0,
      padding: 0,
      width: "100%",
      position: "fixed"
    }
  };
});

/**
 * The page used for setting up a hackathon. This page will only
 * be seen upon first launching the application on the server; after
 * that, users can make modifications on their dashboard.
 */
function SetupPage(props) {
  const classes = useStyles();

  // Sets the current page to the admin registration page.
  // This will animate to the next page upon clicking a button.
  const [currPage, setCurrPage] = React.useState(REGISTER_ADMIN_PAGE);
  const [redirect, setRedirect] = React.useState(REDIRECT.NONE);

  /**
   * Validates the administrator's credentials, communicates with the
   * server, and moves to the next page
   */
  const handleCreateAdmin = user => {
    // @TODO: Validate the given credentials
    props.updateUser(user);
    setCurrPage(SET_ORGANIZATION);
  };

  /**
   * Validates the organization name, communicates with the server,
   * and pushes a new route
   */
  const handleCreateOrg = name => {
    // @TODO: Validate org name
    props.createOrg(name);
    setRedirect(REDIRECT.DASHBOARD);
  };

  return (
    <Container component={"main"} className={classes.main} color="primary">
      {redirect}
      <Container className={classes.megaHeader}>
        <Typography
          component="h1"
          variant={"h1"}
          className={classes.centeredTitle}
        >
          Hello.
        </Typography>
        <Typography
          component="h2"
          variant={"h5"}
          className={classes.centeredTitle}
        >
          Welcome to HackApp!
        </Typography>
      </Container>
      <Container className={classes.animatingBox}>
        <Slide
          in={currPage === REGISTER_ADMIN_PAGE}
          direction={currPage === REGISTER_ADMIN_PAGE ? "left" : "right"}
          className={classes.slide}
        >
          <Container maxWidth={"xs"}>
            <UserForm
              onCompleteText="Create Admin"
              onComplete={handleCreateAdmin}
              getUsername
            />
          </Container>
        </Slide>

        <Slide
          in={currPage === SET_ORGANIZATION}
          direction={currPage === SET_ORGANIZATION ? "left" : "right"}
          className={classes.slide}
        >
          <Container maxWidth={"xs"}>
            <SetupOrgForm handleCreateOrg={handleCreateOrg} />
          </Container>
        </Slide>
      </Container>
      <AlertSnackbar/>
    </Container>
  );
}

export default connect(null, { updateUser, createOrg })(SetupPage);
