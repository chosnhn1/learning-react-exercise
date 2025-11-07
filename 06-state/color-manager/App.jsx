import React from "react";
import ColorList from "/ColorList";
import AddColorForm from "./AddColorForm";
import { v4 } from "uuid";

export default function App() {
  // now Color state is handled in ColorContext:

  // const [colors, setColors] = useState(colorData);

  return (<>
    <AddColorForm
      // onNewColor={(title, color) => {
      //   // add new color into the state
      //   const newColors = [
      //     ...colors,
      //     {
      //       id: v4(),
      //       rating: 0,
      //       title,
      //       color
      //     }
      //   ];
      //   setColors(newColors);
      // }}
    />
    <ColorList
      // colors={colors}
      // onRemoveColor={id => {
      //   const newColors = colors.filter(color => color.id !== id);
      //   setColors(newColors);
      // }}
      // onRateColor={id => {
      //   const newColors = colors.map(color => 
      //     color.id === id ? { ...color, rating } : color
      //   );
      //   setColors(newColors);
      // }}    
    />

  
  </>);
}