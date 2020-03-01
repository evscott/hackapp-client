import { createMuiTheme } from "@material-ui/core";

/**
 * The theme of the application. The current theme only has the
 * primary (red) color defined. All components using colours will
 * make use of the theme to get colours and other stylistic items.
 * @type {Theme}
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#cc2200"
    },
    secondary: {
      main: "#fcc203"
    },

  }
});
