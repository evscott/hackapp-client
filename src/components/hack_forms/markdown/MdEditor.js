import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import { mdeCommands } from "./MdeCommands";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./mde-override-styles.css";
import getIcon from "./MdeIcons";

/** The styles for the component. */
const useStyles = makeStyles(theme => {
  return {
    reactMde: {
      border: "none",
      borderRadius: 0,
      fontSize: "13px"
    }
  };
});

/** A converter for getting a component using a string of markdown. */
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

/**
 * A markdown editor that can also preview the result.
 */
export default function MdEditor(props) {
  const classes = useStyles();

  return (
    <ReactMde
      classes={{
        reactMde: classes.reactMde
      }}
      value={props.text}
      onChange={props.setText}
      selectedTab={props.viewMode ? "preview" : "write"}
      onTabChange={() => {} /* do nothing, tabs are disabled */}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      getIcon={iconName => getIcon(iconName)}
      commands={props.viewMode ? [] : mdeCommands}
    />
  );
}

MdEditor.propTypes = {
  // The text to edit/preview
  text: PropTypes.string.isRequired,
  // The function for changing the text
  setText: (props, propName) => {
    // Type check to ensure we have a function defined when viewMode is true
    if (
      props["viewMode"] === false &&
      (props[propName] === undefined || typeof props[propName] !== "function")
    ) {
      return new Error(
        "MdEditor must have a setter for the text when viewMode is false"
      );
    }
  },
  // Whether we should be previewing the result or editing it
  viewMode: PropTypes.bool
};
