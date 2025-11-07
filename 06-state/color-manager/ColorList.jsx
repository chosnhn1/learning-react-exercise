import React from "react";
import Color from "./Color";
import { useColors } from "./color-hooks";

export default function ColorList(
  // { colors = [], onRemoveColor = f => f, onRateColor = f => f }
) {
  // const { colors } = useContext(ColorContext)
  const { colors } = useColors();

  if (!colors.length) return <div>There is no color to show.</div>

  return (
    <div className="color-list">
      {
        colors.map(color => <Color key={color.id} {...color}
          //  onRemove={onRemoveColor} onRate={onRateColor}
            />)
      }
    </div>
  );
}
