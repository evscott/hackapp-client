import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";

import hackathonImg from "../../img/hackathon-default.jpg";

/**
 * The styles for the hackathon information card.
 * There are a lot of them because it needs to adapt for
 * different screen sizes (mobile <=> desktop).
 */
const useStyles = makeStyles(theme => {
  return {
    root: {
      width: "100%",
      margin: "20px 0"
    },
    media: {
      height: 200
    },
    content: {
      position: "relative"
    },
    info: {
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 180px)",
        display: "inline-block",
        margin: 0,
        clear: "none",
        padding: "0 15px",
        whiteSpace: "nowrap",
        overflow: "hidden"
      }
    },
    title: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    date: {
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        display: "inline-block",
        width: 180,
        borderRight: "1px #CCCCCC solid"
      }
    },
    date1: {
      [theme.breakpoints.down("xs")]: {
        display: "inline-block"
      }
    },
    date2: {
      display: "inline-block",
      clear: "none",
      position: "relative",
      margin: "0 7px",
      [theme.breakpoints.up("sm")]: {
        top: -5
      }
    },
    date3: {
      display: "inline-block",
      clear: "none"
    }
  };
});

/**
 * The hackathon information card component which shows information about
 * a hackathon.
 * @param props Has a startDate, endDate, and title for the hackathon.
 */
export default function HackathonCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={hackathonImg}
          title="Hackathon"
        />
        <CardContent>
          <div className={classes.date}>
            <Typography className={classes.date1} variant="h6" component="p">
              {props.startDate}
            </Typography>
            <Typography className={classes.date2} variant="body2" component="p">
              TO
            </Typography>
            <Typography className={classes.date3} variant="h6" component="p">
              {props.endDate}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              {props.title}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

HackathonCard.propTypes = {
  // A string representing when the hackathon starts.
  // Format: "6:00PM Feb 8"
  startDate: PropTypes.string.isRequired,
  // String representing when the hackathon ends.
  endDate: PropTypes.string.isRequired,
  // The title for the hackathon
  title: PropTypes.string.isRequired
};
