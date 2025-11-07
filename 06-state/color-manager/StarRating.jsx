// No state in this component v. original StarRating
// which makes it to "Pure Component": same render on same props

// ...

export default function StarRating({ totalStars = 5, selectedStars = 0 , onRate = f => f }) {
  return (<>
    {createArray(totalStars).map((n, i) => (<Star
      key={i}
      selected={selectedStars > i}
      onSelect={() => onRate(i + 1)}
    />
    ))}
    <p>
      {selectedStars} / {totalStars}
    </p>
  </>)
}