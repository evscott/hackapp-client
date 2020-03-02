import { commands } from "react-mde";

/**
 * This stylizes the markdown editor commands. It's a hacky
 * way of adding an extra CSS class to make buttons look pretty,
 * since the API is poor.
 */
const stylize = command => {
  return {
    ...command,
    buttonProps: {
      ...command.buttonProps,
      // Add classes
      className: "MuiIconButtonBase-root MuiIconButton-root mde-mui-button"
    }
  };
};

/** A list of commands available to the markdown editor. */
export const mdeCommands = [
  {
    commands: [
      stylize(commands.headerCommand),
      stylize(commands.boldCommand),
      stylize(commands.italicCommand),
      stylize(commands.strikeThroughCommand)
    ]
  },
  {
    commands: [
      stylize(commands.linkCommand),
      stylize(commands.quoteCommand),
      stylize(commands.codeCommand)
    ]
  },
  {
    commands: [
      stylize(commands.unorderedListCommand),
      stylize(commands.orderedListCommand),
      stylize(commands.checkedListCommand)
    ]
  }
];
