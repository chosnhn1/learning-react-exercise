# 리액트 상태 관리

## 6.1 

## 6.2 `useState` Hook

`import { useState } from "react";`

### Depreciated Class Approach

[예시](./StarRating-Class.jsx)

## 6.3 Refactoring for Reusability

1. `style` property
2. 

## 6.4 State in Component Tree

## 6.5 Form

```html
<form>
  <input type="text" placeholder="color title..." required />
  <input type="color required" />
  <button>Add</button>
</form>
```

### 6.5.1 Using Reference: `useRef`

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

### 6.5.3 Custom Hooks

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

Passing state through multiple nodes: burdensome, makes bugs

Context: "jet" for react data

