# Improving Components with Hooks

* Hooks make rendering rules
* and there are more hooks React provides

* Hook이란 무엇일까: 컴포넌트 렌더링의 여러 규칙(원인, 시점, ...)을 정의하는 수단
  * 무엇이 바뀌면 다시 렌더링해야 하는가? / 무엇은 컴포넌트가 제어하고 무엇은 그러지 않아야 하는가? / 렌더링이 끝나고 할 일? / ...
  * 1번의 주요 수단으로써의 `useState`

* In chapter 6:
  * `useState`
  * `useRef`
  * `useContext`
* and in this chapter:
  * Crucials in app dev
    * `useEffect`
    * `useLayoutEffect`
    * `useReducer`
  * for optimization
    * `useCallback`
    * `useMemo`

1. useEffect
  1. 의존 관계 배열
  2. 의존 관계를 깊게 검사하기
  3. useLayoutEffect를 사용해야 하는 경우
  4. 훅스의 규칙 
  5. useReducer로 코드 개선하기
  6. useReducer로 복잡한 상태 처리하기
  7. 컴포넌트 성능 개선
  8. shouldComponentUpdate와 PureComponent
  9. 언제 리팩터링할까?

## 7.1 `useEffect`

What if Component should do something after rendering?

렌더링 후에 할 일이 있는 컴포넌트

eg. Checkbox component - This component should make alert after checking:

```jsx
import React, { useState } from "react";

function Checkbox() {
  const [checked, setChecked] = useState(false);

  alert(`checked: ${checked.toString()}`);

  return (<>
    <input
      type="checkbox"
      value="checked"
      onChange={() => setChecked(checked => !checked)}
    />
    {checked ? "checked" : "not checked" }
  </>);
}
```

* `alert()` will block rendering, so before closing alert rendering will not happened
* What if you want to render them? alert after return? it will not work
* so in this case, use `useEffect` ("This will be done as rendering's 'side effect'")

* What can be done with `useEffect`?
  * alert
  * console.log
  * Broswer & Native APIs
* Those are not in rendering (return)

examples: 

```js
useEffect(() => {
  console.log(checked ? "Yes" : "No" );
});
```

```js
useEffect(() => {
  localStorage.setItem("checkbox-value", checked);
});
```

```js
useEffect(() => {
  txtInputRef.current.focus();
});
```

### 7.1.1 Dependency Array

* useEffect is designed with useState, useReducer ... in mind

* Example
  * `App` has two states: `val`, `phrase`
  * User input text, `val` changes, click button to send, `phrase` changes and `val` plushes into "" 
  * without dependency array, all `useEffect` will be called too many (phrase part will be called when val changes)

```jsx
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [val, set] = useState("");
  const [phrase, setPhrase] = useState("example phrase");

  const createPhrase = () => {
    setPhrase(val);
    set("");
  };

  useEffect(() => {
    console.log(`typing "${val}"`);
  });

  useEffect(() => {
    console.log(`saved phrase "${phrase}"`);
  });

  return (<>
    <label>Favorite Phrase: </label>
    <input
      value={val}
      placeholder={phrase}
      onChange={e => set(e.target.value)}
    />
    <button onClick={createPhrase}>Send</button>
  </>);
}
```

So let's control useEffect point with dependency array:

```jsx
  useEffect(() => {
    console.log(`typing "${val}"`);
  }, [val]);

  useEffect(() => {
    console.log(`saved phrase "${phrase}"`);
  }, [phrase]);
```

* Effects check multiple dependencies:

```jsx
  useEffect(() => {
    console.log("either val or phrase has changed");
  }, [val, phrase]);
```

* blank dependencies: Effect only called once after initial render
* These kinds of effects fit well on initializing

```jsx
  useEffect(() => {
    console.log("This will called only once!");
  }, []);
```

* Effect returning function: when component is removed, the effect will be called

```jsx
  useEffect(() => {
    welcomeChime.play();
    return () => goodbyeChime.play();
  }, [])
```

use custom hooks for this

### 7.1.2 Deep-checking Dependencies

* What If side effects' dependencies are objects and arrays?

eg.

```jsx
// Custom Hook ren-render component when keydown
const useAnyKeyToRender = () => {
  const [, forceRender] = useState();
  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown" forceRender);
  }, []);
};
```

```jsx
// App
function App() {
  useAnyKeyToRender();

  const word = "gnar";

  useEffect(() => {
    console.log("fresh render");
  }, [word]);

  return <h1>Open the console</h1>;
}
```

```jsx
  const words = ["sick", "powder", "day"];

  // At (re-)render - words declared anew;
  // so this will trigger another "fresh render"
  useEffect(() => {
    { ... }
  }, [words]);
```

1. locate words out of the `App`
  * But what if you need them in App?
2.  `useMemo` & `useCallback` (for function)

[Example](./deepcheck/App.jsx)

### 7.1.3 `useLayoutEffect`

"Rendering >> useLayoutEffect >> Browser draw screen, elements added to DOM >> useEffect"

If intended side-effects are needed to drawing: `useLayoutEffect`

eg. Want to get Element's width and height if window size is changed

```jsx
function useWindowSize {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return [width, height];
}
```

eg. App using mouse position

```jsx
function useMousePosition {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const setPosition = ({x, y}) => {
    setX(x);
    setY(y);
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition);
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);

  return [x, y];

}
```

### 7.1.4 Rules for Hooks

1. Hooks only work inside the Component
2. It's good to divide features into several hooks
3. Hooks should be called at the top level of the component
  * not in conditions, loop, inside functions

1. 훅스는 컴포넌트 영역 안에서만 작동한다
2. 기능을 여러 훅으로 나누면 좋다
3. 최상위 수준에서만 훅을 호출해야 한다

eg. on 2

```
```


eg. on 3

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // calling useState in if statement (x)
  if (count > 5) {
    const [checked, toggle] = useState(false);
  }

  useEffect(() => {
    // ...
  });

  if (count > 5) {
    useEffect(() => {
      // ...
    });
  }

  useEffect(() => {
    // ...
  });

  return ( ... );

}
```

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // call hooks only inside of the top level of component function, and internalize condition eval
  const [checked, toggle] = useState(
    count => (count < 5)
    ? undefined
    : !c,
    (count < 5) ? undefined
  );

  useEffect(() => {
    // ...
  });

  useEffect(() => {
    if (count < 5) return;
    // ...
  });

  useEffect(() => {
    // ...
  });

}
```

it's same in asynchronous actions
```jsx
// (x)
useEffect(async () => {})
```

```jsx
useEffect(() => {
  const fn = async () => {
    await SomePromise();
  };
  fn();
});

// anonymous function case:
useEffect(() => {
  (async () => {
    await SomePromise();
  })();
});
```

ESLint plugin for these mistakes: `eslint-plugin-react-hooks`

### 7.1.5 `useReducer`

"Reducer": setState 함수에 전달되는, "현재 상태를 받아서 새 상태를 반환하는" 함수

[예시](./Checkbox.jsx)

Don't hard-code toggling checkbox into onChange and let's abstract it with useReducer

cf. `Array.reduce`

```jsx
const numbers = [28, 34, 67, 68];
numbers.reduce((number, nextNumber) => number + nextNumber, 0); // 197
```

```jsx
function Numbers() {
  const [number, setNumber] = useReducer(
    (number, newNumber) => number + newNumber,
    0
  );

  // 30 will be added to number when h1 is clicked:
  return <h1 onClick={() => setNumber(30)}>{number}</h1>
}
```

[Example: Using `useReducer` with complex state (ie. User obj) ](./User.jsx)

#### Legacy `setState` / `useReducer` in Class Component

```jsx
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "0391-3233-3210",
      firstName: "Billy",
      lastName: "Kim",
      city: "Gangbuk",
      state: "Seoul",
      email: "bkim@mtnwilsons.com",
      admin: false
    };
  }
}

///  ... 

<button onSubmit={() => 
    {this.setState({admin: true});}}>
  Make Admin    
</button>
```

```jsx
/// useReducer case:
const [state, setState] = useReducer(
  (state, newState) => ({...state, ...newState}),
  initialState
);

<button onSubmit={() => 
    {this.setState({admin: true});}}>
  Make Admin    
</button>
```

### 7.1.7 Improving Component Performance: `memo`, `useMemo`, and `useCallback`

* `memo`: want to make pure component

#### Example 1: components unnecessarily re-rendered

```jsx
// Cat.jsx
const Cat = ({ name }) => {
  console.log(`rendering ${name}`); // less pure comp for debug
  return <p>{name}</p>;
}
```

```jsx
function App() {
  const [cats, setCats] = useState(["Biscuit", "Jungle", "Outlaw"]);

  // each Cat will be re-rendered when adding cats
  // but, why do you want them re-rendered when they are pure components and are not needed to be?
  // (pure: no input change >> no output change)
  // memo will be helpful in this case

  return (<>
    {cats.map((name, i) => (
      <Cat key={i} name={name} />
    ))}
    <button onClick={() => setCats([...cats, prompt("Name a cat: ")])}>
      Add a cat
    </button>
  </>)
}
```

#### Example 2: Prevent re-rendering with memo

```jsx
// Cat.jsx
import { memo } from "react";
const Cat = ({name}) => {
  // ...
  return <p>{name}</p>;
};

const PureCat = memo(Cat);
```

```jsx
// App.jsx
function App() {
  // ...

  return (
    <>
    {cats.map((name, i) => <PureCat key={i} name={name} />);}
    {/* ... */}
    </>
  )
}

```

This works well with `name` prop, but function properties will not work as well.

#### Example 3: Remove function props from re-render eval, using `memo` once again

```jsx
const PureCat = memo(
  Cat,
  // memo get second param as predicate (true/false)
  // this will eval "Should this component be re-rendered?"
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
```

### 7.1.8 Legacy `shouldComponentUpdate` & `PureComponent`

```jsx
class Cat extends React.Component {
  // ...

  render() {
    return (
      <span>{name} is a good cat!</span>
    );
  }
}
```

```jsx
class Cat extends React.PureComponent {
  // ...

  render() {
    return (
      <span>{name} is a good cat!</span>
    );
  }
}
```

#### `useCallback`, `useMemo`: memoize functions & objects

[참고 - 이전 챕터]()

```jsx
const PureCat = memo(Cat);

function App() {
  const meow = useCallback(name => console.log(`${name} has meowed`, []));
  return <PureCat name="Biscuit" meow={meow} />;
}
```

### 7.1.9 Refactor, when?

* `useMemo`, `useCallback`과 `memo`의 과용
  * React is for "Re-render", and re-rendering of React is already pretty fast
  * refactoring for optimization should be late steps of dev 
* Refactoring should have objectives
  * ie. freezing, flickering, costly functions
* Use devtools to evaluate whether optimization is necessary
