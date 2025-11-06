const data = [
  {
    "name": "",
    "ingredients": [
      { "name": "", "amount": 0, "measurement": "gram" },
      { "name": "", "amount": 0, "measurement": "gram" },
      { "name": "", "amount": 0, "measurement": "gram" },
      { "name": "", "amount": 0, "measurement": "gram" },
      { "name": "", "amount": 0, "measurement": "gram" },
      { "name": "", "amount": 0, "measurement": "gram" },
    ],
    "steps": [
      ""
    ]
  },
]

function Recipe({ name, ingredients, steps }) {
  return (<section id={name.toLowerCase().replace(/ /g, "-")}>
    <h1>{name}</h1>
    <ul className="ingredients">
      {ingredients.map((ingredient, i) => (
        <li key={i}>{ingredient.name}</li>
      ))}
    </ul>
    <section className="instructions">
      <h2>Cooking steps:</h2>
      {steps.map((step, i) => (
        <p key={i}>{step}</p>
      ))}
    </section>
  </section>
  );
}

function Menu({ title, recipes }) {
  return (
  <article>
    <header>
      <h1>{title}</h1>
    </header>
    <div className="recipes">
      {recipes.map((recipe, i) =>
        <Recipe key={i} {...recipe} />
      )}
    </div>
  </article>
  );
}

ReactDOM.render(
  <Menu recipes={data} title="" />,
  document.getElementById("root")
);