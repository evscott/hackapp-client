import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
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
    nowrap: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    date: {
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        display: "inline-block",
        width: 180,
        borderRight: "1px #CCCCCC solid",
        top: -7
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
    },
    primaryDetails: {
      paddingBottom: 8
    },
    secondaryDetails: {
      textAlign: "center",
      backgroundColor: theme.palette.grey[100]
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
        <CardContent className={classes.primaryDetails}>
          <div className={classes.date}>
            <Typography className={classes.date1} variant="h6" component="p">
              {dayjs(props.overview.startDate).format("h:mma MMM D")}
            </Typography>
            <Typography className={classes.date2} variant="body2" component="p">
              TO
            </Typography>
            <Typography className={classes.date3} variant="h6" component="p">
              {dayjs(props.overview.endDate).format("h:mma MMM D")}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.nowrap} variant="h4" component="h2">
              {props.overview.name}
            </Typography>
            <Typography className={classes.nowrap}>
              {props.overview.location}
            </Typography>
          </div>
        </CardContent>
        <CardContent className={classes.secondaryDetails}>
          <Typography>
            Up to <b>{props.overview.maxRegistrants}</b> attendees can register
            by <b>{dayjs(props.overview.regDeadline).format("h:mma MMMM D, YYYY")}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

HackathonCard.propTypes = {
  // The overview object, with all the data to be show about the hackathon
  overview: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string.isRequired,
    maxRegistrants: PropTypes.number.isRequired,
    regDeadline: PropTypes.instanceOf(Date).isRequired
  }).isRequired
};
