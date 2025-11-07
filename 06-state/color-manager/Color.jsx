import React from "react";
import { FaTrash } from "react-icons/fa";
import StarRating from "../StarRating";
import { useColors } from "./color-hooks";

export default function Color({ id, title, color, rating
  // 6.6.4:
  // , onRemove = f => f, onRate = f => f
}) {
  // Why don't use state here?: pure component
  // you can reuse Color elsewhere, while managing states on parent Component

  const { rateColor, removeColor } = useColors();

  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating selectedStars={rating} onRate={rating => rateColor(id, rating)} />
    </section>
  );
}
