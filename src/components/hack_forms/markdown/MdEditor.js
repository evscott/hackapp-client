import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import { mdeCommands } from "./MdeCommands";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./mde-override-styles.css"
import getIcon from "./MdeIcons";

const useStyles = makeStyles(theme => {
  return {
    reactMde: {
      border: "none",
      borderRadius: 0,
      fontSize: "13px"
    }
  };
});

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default function MdEditor(props) {
  const classes = useStyles();

  return (
    <ReactMde
      classes={{
        reactMde: classes.reactMde
      }}
      value={props.text}
      onChange={props.setText}
      selectedTab={props.view ? "preview" : "write"}
      onTabChange={() => {} /* do nothing */ }
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      getIcon={iconName => getIcon(iconName)}
      commands={props.view ? [] : mdeCommands}
    />
  )
}

MdEditor.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  view: PropTypes.bool
};
