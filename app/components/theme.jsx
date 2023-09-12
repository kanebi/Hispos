import defaultFace from "../../public/font/euphemia.ttf";
import { deepMerge } from "grommet/utils/index.js";

import { Grommet } from "grommet";
import { grommet } from "grommet";
const themeScheme = {
  global: {
    backgrounds: {
      default: { dark: "#141014", light: "#fce1f3" },
      form: { dark: "#1a141a", light: "#faf7fa" },
      box: { dark: "#382c35", light: "#fbf0ff" },
      active: { light: "#fc81d7", dark: "#33272f" },
      button: { dark: "#FCD8C9", light: "#a695a3" },
      input: { dark: "#382e42", light: "#fcebfa" },
      pos_brand: { dark: "#433b47", light: "#f7e1f4" },
      pos_text: { dark: "#a89ead", light: "#e058e0" },
    },

    colors: {
      default: { dark: "#fcedfc", light: "#7B526E" },
      form: { dark: "#0f0e0f", light: "#1a101a" },
      box: { dark: "#1b1a1c", light: "#0c0212" },
      active: { light: "#171416", dark: "#cf9dbe" },
      link: { dark: "#e85ac2", light: "#f065fc" },
      icon: { dark: "#FCD8C9", light: "#a695a3" },
      border: {
        light: "#FCD8C9",
        dark: "#84668a",
      },
      "brand-light": "#fce1f3",
      "brand-dark": "#fcedfc",
      button: { dark: "#a695a3", light: "#FCD8C9" },
      text: { dark: "#fcedfc", light: "#0f0d0f" },
      background: { dark: "#141014", light: "#fce1f3" },
    },

    control: {
      border: { radius: "5px", width: "1px", color: "border" },
    },
    elevation: {
      dark: {
        none: "none",
        xsmall: "0px 2px 2px rgba(250, 202, 250, 0.40)",
        small: "0px 4px 4px rgba(250, 202, 250, 0.40)",
        medium: "0px 6px 8px rgba(250, 202, 250, 0.40)",
        large: "0px 8px 16px rgba(250, 202, 250, 0.40)",
        xlarge: "0px 12px 24px rgba(250, 202, 250, 0.40)",
      },
      light: {
        none: "none",
        xsmall: "0px 1px 2px rgba(26, 20, 26, 0.20)",
        small: "0px 2px 4px rgba(26, 20, 26, 0.20)",
        medium: "0px 4px 8px rgba(26, 20, 26, 0.20)",
        large: "0px 8px 16px rgba(26, 20, 26, 0.20)",
        xlarge: "0px 12px 24px rgba(26, 20, 26, 0.20)",
      },
    },
    focus: {
      outline: { size: "1px", color: "default" },
    },
    font: {
      family: "perpetua",

      //   face: {
      //     src: `url(${defaultFace})`,
      //     "font-family": "euphemia",
      //   },
    },
    hover: {
      background: {
        opacity: "strong",
        dark: true,
        color: { dark: "#141014", light: "#FCD8C9" },
      },
      color: { dark: "#FCD8C9", light: "#141014" },
    },
    input: {
      padding: "medium",
      font: { height: "normal", size: "normal" },
    },
    selected: {
      background: { color: "default", dark: true },
      color: "default",
    },
    spacing: "24px",
    active: { background: "active", color: "active" },
  },
  button: {
    border: { color: { dark: "#7a6776", light: "#fcd9f4" } },
    color: { dark: "#9c959a", light: "#714d75" },
    primary: {
      background: "button",
      color: "button",
    },
  },
};

const theme = deepMerge(grommet, themeScheme);
export default theme;
