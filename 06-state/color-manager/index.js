import React, { createContext } from "react";
import colors from "./color-data.json";
import { render } from "react-dom";
import App from "./App";

import { ColorProvider } from "./color-hooks.js";
// export const ColorContext = createContext();

render(
  <ColorProvider>
    <App />
  </ColorProvider>,
  document.getElementById("root")
);
