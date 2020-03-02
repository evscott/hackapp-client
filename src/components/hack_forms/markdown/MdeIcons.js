import React from "react";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import LinkIcon from "@material-ui/icons/Link";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import CodeIcon from "@material-ui/icons/Code";
import ImageIcon from "@material-ui/icons/Image";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

/**
 * Gets the icon for each possible markdown editor command.
 */
export default function getIcon(iconName) {
  switch (iconName) {
    case "header":
      return <TextFieldsIcon size="small" />;
    case "bold":
      return <FormatBoldIcon size="small" />;
    case "italic":
      return <FormatItalicIcon size="small" />;
    case "strikethrough":
      return <StrikethroughSIcon size="small" />;
    case "link":
      return <LinkIcon size="small" />;
    case "quote":
      return <FormatQuoteIcon size="small" />;
    case "code":
      return <CodeIcon size="small" />;
    case "image":
      return <ImageIcon />;
    case "unordered-list":
      return <FormatListBulletedIcon size="small" />;
    case "ordered-list":
      return <FormatListNumberedIcon size="small" />;
    case "checked-list":
      return <PlaylistAddCheckIcon size="small" />;
    default:
      return "UNDEFINED";
  }
}
