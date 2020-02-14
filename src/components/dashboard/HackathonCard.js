import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: "100%"
    }
  };
});

export default function HackathonCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Hackathon Name
        </Typography>
      </CardContent>
    </Card>
  );
}

HackathonCard.propTypes = {

};
