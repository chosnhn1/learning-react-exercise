# 4. 리액트의 작동 원리 How React Works

1. 페이지 설정
2. 리액트 엘리먼트
3. ReactDOM
4. 리액트 컴포넌트

## 4.1

## 4.2 React Element

* Instead of DOM API, React will handle DOM
* It's 

```js
React.createElement("h1", { id: "recipe-0" }, "Baked Salmon");
//
```

It makes this:

```html
<h1 id="recipe-0">Baked Salmon</h1>
```

```js
{
  $$typeof: Symbol(React.element),
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {id: "recipe-0", children: "Baked Salmon"},
  "_owner": null,
  "_store": {}
}
```

[React API: createElement](https://react.dev/reference/react/createElement)


## 4.3 ReactDOM

## 4.4 React Component

Reusing DOM Structure between different data set

```js
const data = [ ... ]

function Component({ items }) {
  return React.createElement(
    "ul",
    { className: "something" },
    items.map((item, i) =>
      React.createElement("li", { key: i }, item)
    )
  );
}

ReactDOM.render(
  React.createElement(Component, { items: data }, null),
  document.getElementById("root")
);
```

### 4.4.1 Short History of React Component

1. `React.createClass`
2. `React.Component`
