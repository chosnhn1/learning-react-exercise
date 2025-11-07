# 리액트 상태 관리

## 6.1 

## 6.2 `useState` Hook

`import { useState } from "react";`

### Depreciated Class Approach

[예시](./StarRating-Class.jsx)

## 6.3 Refactoring for Reusability

1. `style` property

```jsx
export default function StarRating({ style = {}, totalStars = 5 }) {  // add "style = {} to props"

  // default style
  // and give style from props
  return <div style={{ padding: "5px", ...style }}>

  </div>;
}
```

2. passing other normal props

```jsx
export default function StarRating({ style = {}, totalStars = 5, ...props }) {  // add "...props"
  // ...

  // pass ...props to component
  return <div style={{ padding: "5px", ...style }} {...props} >

  </div>;
}
```

  * this has two assumptions:
    1. dev will add props only div supports
    2. dev will don't do bad things


## 6.4 State in Component Tree

* Don't spread states all over the app: so hard to change & debug
* Managing States
  * Methods:
    1. Save states to component tree, and pass with prop

### 6.4.1

### 6.4.2 Passing Interactions to Upper Side of Component Tree



## 6.5 Form

```html
<form>
  <input type="text" placeholder="color title..." required />
  <input type="color required" />
  <button>Add</button>
</form>
```

### 6.5.1 Using Reference: `useRef`

"ref": The Object saving component "lifetime" value


If you want to access DOM directly

```jsx
import React, { useRef } from "react";
export default function AddColorForm({ onNewColor = f => f }) {
  const txtTitle = useRef();
  const hexColor = useRef();

  const submit = e => { ... };

  return (...);
}

```

When you use useRef:

* need to access DOM directly
  * want to use base HTML, JS, ...
* do something outside of base React component lifecycle
  * save data outside of re-renderings

### 6.5.2 Components Controllable

```jsx
import React, { useState } from "react";
export default function AddColorForm({ onNewColor = f => f }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");

  const submit = e => { ... };

  return (...);
}

```

When you use state to control:

* Usual cases: that's what React for
* Functional programming
* But you should note that this component will re-render alot

### 6.5.3 Custom Hooks

eg. very big Form element with lots of input

```jsx
import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};
```

## 6.6 React Context

* Save state only in one location
  * a good approach, but not always available: especially the app is big and complicated
  * Passing state through multiple nodes: burdensome, makes bugs

* Context: "jet" for react data
  * states are wrapped into "context provider"
  * save all data in one place, but no need to passing them

### 6.6.3 Context Provider Having States

[File](./color-manager/ColorProvider.jsx)

* This ColorProvider provide color, and methods to edit colors
* `setColors` is not exposed to consumers

### 6.6.4 Context & Custom Hooks

[Example](./color-manager/color-hooks.js)

* custom hooks are good tools for "separation of concerns"!
* with custom hooks, React Components can only concentrate on rendering UI up to date
* Hooks can be developed, tested, and even deployed separately 