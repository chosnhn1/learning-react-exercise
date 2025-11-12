# 6. 리액트 상태 관리

1. 별점 컴포넌트 만들기
2. useState 훅
3. 재사용성을 높이기 위한 리팩터링
4. 컴포넌트 트리 안의 상태
  1. 상태를 컴포넌트 트리 아래로 내려보내기
  2. 상호작용을 컴포넌트 트리 위쪽으로 전달하기
5. 폼 만들기
  1. 참조 사용하기
  2. 제어가 되는 컴포넌트
  3. 커스텀 훅 만들기
  4. 색을 상태에 추가하기
6. 리액트 콘텍스트
  1. 콘텍스트에 색 넣기
  2. useContext를 통해 색 얻기
  3. 상태가 있는 콘텍스트 프로바이더
  4. 콘텍스트와 커스텀 훅

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

* 상태가 앱 여기저기 분산되면 관리하기 힘들다
* 상태관리 방법 중 하나: prop으로 주고받기

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

* DOM 요소를 직접 참조하는 useRef

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

반복되는 State 사용을 Custom Hook으로 관리할 수 있다

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

* 한 컴포넌트/장소에서 상태 관리하기
  * 좋은 방법이지만 특히 서비스가 크고 복잡해질수록 관철하기 어려움
  * 프로젝트가 커지면 결국 여러 컴포넌트에 상태가 산재/분산되기 마련
  * 매번 prop으로 넘기고 받기: 잘못될 여지가 언제나 존재

* Context: "jet" for react data
  * states are wrapped into "context provider"
  * save all data in one place, but no need to passing them

* 컨텍스트: 상태를 Context Provider에 넣어 관리하기
  * Context Provider로 해당 상태를 사용하려 하는 소비자를 감싸기
  * 최상위에서 감싸기도 하지만, 하위 컴포넌트에서 감싸서 사용할 수 있음

### 6.6.3 Context Provider Having States

[File](./color-manager/ColorProvider.jsx)

* This ColorProvider provide color, and methods to edit colors
* `setColors` is not exposed to consumers

### 6.6.4 Context & Custom Hooks

[Example](./color-manager/color-hooks.js)

* custom hooks are good tools for "separation of concerns"!
* with custom hooks, React Components can only concentrate on rendering UI up to date
* Hooks can be developed, tested, and even deployed separately 

* React Custom Hook의 강점: "관심사 분리"
* 컴포넌트의 데이터 핸들링을 Hook에게 넘기고 UI에만 집중할 수 있도록 만듦
* Hook은 별도로 개발/테스트/배포될 수 있다