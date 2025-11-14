import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const data = [
  {
    name: "Baked Salmon",
    ingredients: [
      {
        name: "Salmon",
        amount: 500,
        measurement: "gram"
      }
    ],
    steps: ["Heat oven to 180 celcius."]
  }
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Menu recipes={data} title="Recipes" />
  </StrictMode>
);
