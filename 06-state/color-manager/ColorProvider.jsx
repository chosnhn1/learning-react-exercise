import React, { createContext, useState } from "react";
import colorData from "./color-data.json";

const ColorContext = createContext();

/** Custom provider */
// export default function ColorProvider({ children }) {
//   const [colors, setColors] = useState(colorData);
//   return (
//     <ColorContext.Provider value={{ colors, setColors }}>
//       {children}
//     </ColorContext.Provider>
//   );
// }

export default function ColorProvider({ children }) {
  const [colors, setColors] = useState(colorData);

  const addColor = (title, color) =>
    setColors([
      ...colors,
      {
        id: v4(),
        rating: 0,
        title,
        color
      }
    ]);

  const rateColor = (id, rating) =>
    setColors(
      colors.map(color => (color.id === id ? { ...color, rating } : color))
    );

  const removeColor = id => setColors(colors.filter(color => color.id !== id));

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
}
