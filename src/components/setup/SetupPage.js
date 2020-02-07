import React from "react";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RightButtonBar from "../buttons/RightButtonBar";
import { makeStyles } from "@material-ui/core/styles";

const REGISTER_ADMIN_PAGE = 0;
const SET_ORGANIZATION = 1;

const useStyles = makeStyles(theme => {
  return {
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    },
    main: {
      padding: "0"
    },
    megaHeader: {
      paddingTop: "150px",
      paddingBottom: "20px",
      backgroundColor: theme.palette.primary.main,
      color: "#FFF"
    },
    animatingBox: {
      position: "relative",
      display: "flex",
      justifyContent: "center"
    },
    animatable: {
      position: "fixed",
      margin: 0,
      padding: 0
    },
    centeredTitle: {
      textAlign: "center",
      width: "100%"
    },
    rightButtonBox: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      margin: "10px 0",
      padding: 0
    },
    slide: {
      margin: 0,
      padding: 0,
      width: "100%"
    }
  };
});

export default function SetupPage() {
  const classes = useStyles();
  const [currPage, setCurrPage] = React.useState(0);

  const handleCreateAdmin = () => {
    setCurrPage(SET_ORGANIZATION);
  };

  const handleCreateOrg = () => {
    // Push a route
  };

  return (
    <Container component={"main"} className={classes.main} color="primary">
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
        <Container maxWidth={"xs"} className={classes.animatable}>
          <Slide
            in={currPage === REGISTER_ADMIN_PAGE}
            direction={currPage === REGISTER_ADMIN_PAGE ? "left" : "right"}
            className={classes.slide}
          >
            <form className={classes.form} noValidate>
              <TextField
                variant={"outlined"}
                required
                fullWidth
                id={"email"}
                label={"Email Address"}
                name={"email"}
                margin={"normal"}
              />
              <TextField
                variant={"outlined"}
                required
                fullWidth
                id={"password"}
                label={"Password"}
                name={"password"}
                margin={"normal"}
              />
              <RightButtonBar>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateAdmin}
                >
                  Create Admin
                </Button>
              </RightButtonBar>
            </form>
          </Slide>
        </Container>
        <Container maxWidth={"xs"} className={classes.animatable}>
          <Slide
            in={currPage === SET_ORGANIZATION}
            direction={currPage === SET_ORGANIZATION ? "left" : "right"}
            className={classes.slide}
          >
            <form className={classes.form} noValidate>
              <TextField
                variant={"outlined"}
                required
                fullWidth
                id={"org-name"}
                label={"Organization Name"}
                name={"org-name"}
                margin={"normal"}
              />
              <RightButtonBar>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateOrg}
                >
                  Create Organization
                </Button>
              </RightButtonBar>
            </form>
          </Slide>
        </Container>
      </Container>
    </Container>
  );
}
