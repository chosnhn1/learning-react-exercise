import React from "react";
import Color from "./Color";

export default function ColorList({ colors = []}) {
  if (!colors.length) return <div>There is no color to show.</div>

  return (
    <div>
      {
        colors.map(color => <Color key={color.id} {...color} />)
      }
    </div>
  );
}
