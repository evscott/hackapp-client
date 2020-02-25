import { commands } from "react-mde";

const stylize = command => {
  return {
    ...command,
    buttonProps: {
      ...command.buttonProps,
      className: "MuiIconButtonBase-root MuiIconButton-root mde-mui-button"
    }
  };
};

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
