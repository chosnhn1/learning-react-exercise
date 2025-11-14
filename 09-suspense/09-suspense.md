# 9. Suspense

* a "less important" chapter
* but if you make a lot of hooks
* also if you have React libraries

1. 오류 경계
2. 코드 분리하기
  1. 소개: Suspense 컴포넌트
  2. Suspense를 데이터와 함께 사용하기
  3. 프라미스를 throw하기
  4. Suspense가 가능한 데이터 소스 만들기
  5. 파이버

## 9.1 오류 경계

* Component that borders error and keep them from breaking entire app
* right now (2022) it can only be made with Class component
* ["Catching rendering errors with an error boundary"](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

```jsx
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (error) return <fallback error={error} />;
    return children;
  }
}
```

```jsx
function ErrorScreen({ error }) {
  return (<div className="error">
    <h3>Something went wrong.</h3>
    <p>{ error.message }</p>
  </div>);
}

// ...

<ErrorBoundary fallback={ErrorScreen}>
  <App />
</ErrorBoundary>
```


## 9.2 코드 분리하기

* Code splitting
  * split code base into easy-handled chunks & load them on demand
  * [`React.lazy()`](https://react.dev/reference/react/lazy)

* Example: Agreement Component
```jsx
// Agreement.jsx
export default function Agreement({ onAgree = f => f }) {
  return (
    <div>
      <p>Terms...</p>
      <p>These are the terms and stuff. Do you agree?</p>
      <button onClick={onAgree}>I Agree</button>
    </div>
  );
}
```

```jsx
// Main.jsx
const SiteLayout = ({ children, menu = c => null }) => {
  // ...
};

const Menu = () => (
  // ...
);

const Callout = ({ children }) => {
  // ...
}

// declare site-render location
export default function Main() {
  return (
  <SiteLayout menu={<Menu />}>
    <Callout>Welcome to the Site</Callout>
    <ErrorBoundary>
      <h1>TODO: Home page</h1>
      <p>Complete the main contents for this home page.</p>
    </ErrorBoundary>
  </SiteLayout>
  );
}
```

```jsx
// App.jsx
export default function App() {
  const [agree, setAgree] = useState(false);

  if (!agree) {
    return <Agreement onAgree={() => setAgree(true)} />;
  }

  return <Main />;
}
```

* The problem is, Main part gonna be bundled

```jsx
const Main = React.lazy(() => import("./Main"));
```

### 9.2.1 소개: Suspense 컴포넌트

* [`Suspense` Component](https://react.dev/reference/react/Suspense)
  * works like error boundary
    * wrap component with Suspense
    * when delayed, Suspense render message

```jsx
import { Suspense } from "React";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function App() {
  const [agree, setAgree] = useState(false);

  if (!agree) {
    return <Agreement onAgree={() => setAgree(true)} />;
  }

  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <Main />
    </Suspense>
  );
}
```

* With this, React will do lazy load "Main" code base (load until user agrees)
* When loading Main, what if network fails?: use ErrorBoundary to handle this

* Error Boundary + Suspense + Main Component = can handle almost all of the async request

### 9.2.2 Suspense를 데이터와 함께 사용하기

* Remember `useFetch` and `Fetch` made in Chapter 8
* using Suspense when fetching data

```jsx
// Status Component
import React from "react";

const loadStatus = () => "success - ready";

function Status() {
  const status = loadStatus();
  return <h1>status: {status}</h1>;
}
```

Status can be rendered in App-ErrorBoundary

1. When throw error:

```jsx
const loadStatus = () => {
  throw new Error("something went wrong");
};
```

2. throw promise

```jsx
const loadStatus = () => {
  throw new Promise(resolves => null);
};
```

this will give you a new error: you have some Promise going on but don't have Suspense to render fallback 

### 9.2.3 프라미스 던지기

* Javascript handling error
* usually you are going to throw Error to debug
* but in Javascript you can throw anything

```jsx
const loadStatus = () => {
  console.log("load status");
  throw new Promise(resolves => setTimeout(resolves, 3000));
}

safe(loadStatus);

function safe(fn) {
  try {
    fn();
  } catch (error) {
    if (error instanceof Promise) {
      error.then(() => safe(fn));
    } else {
      throw error;
    }
  }
}
```

### 9.2.4 Suspense가 가능한 데이터 소스 만들기

* When you Suspense with data, you want a data source having three types of returns:
  * Pending
  * Success (resolve)
  * Error (reject)

```jsx
function loadStatus() {
  if (error) throw error;         // Error
  if (response) return response;  // Success
  throw promise;                  // Pending
}
```

* you want to have a place in which you declare error, response and promise
* also these three should not collide with other requests
* therefore you should use them with closure
* [JavaScript Guide - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
  * [emulating private methods with closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures#emulating_private_methods_with_closures)

```jsx
const loadStatus = (function() {    // can you notice a parenthesis?
  let error, promise, response;
  return function() {
    if (error) throw error;
    if (response) return response;
    throw promise;
  };
})();
```

```jsx
const loadStatus = (function() {
  let error, response;
  const promise = new Promise(resolves =>
    setTimeout(resolves, 3000)  // wait 3s loop
  )
  .then(() => (response = "success"))
  .catch(e => (error = e));             // assign success and error
  return function() {
    if (error) throw error;
    if (response) return response;
    throw pending;
  };
})();
```

```jsx
const resource = createResource(promise);
const result = resource.read();

function createResource(pending) {
  let error, response;
  pending.then(r => (response = r)).catch(e => (error = e));

  return {
    read() {
      if (error) throw error;
      if (response) return response;
      throw pending;
    }
  };
}
```

Example: data object after 3 seconds

```jsx
// give { gnar } but cost 3 seconds
const threeSecondsToGnar = new Promise(resolves =>
  setTimeout(() => resolves({ gnar: "gnarly!" }), 3000)
);

// 3sGnar is wrapped with createResource
// so this has three status with read() call
const resource = createResource(threeSecondsToGnar);

function Gnar() {
  const result = resource.read();
  return <h1>Gnar: {result.gnar}</h1>;
}

export default function App() {
  return (
    <Suspense fallback={<GridLoader />}>
      <ErrorBoundary>
          <Gnar />
      </ErrorBoundary>
    </Suspense>
  );
}

```

* with `createResource` function (3 phase), you can...
  * try re-connect to data source
  * log performance statistics
  * ...

### 9.2.5 파이버 (Fiber)

* Reconciliation algorithm

1. control DOM: keep redrawing components
2. React: making partial update with WIP DOM
  * but it is also burdensome task
3. Fiber (React 16.0): more async version of this reconcile
  * divide renderer and reconciler
  * Scheduling

* [React Learn: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
* [네이버 D2: React 파이버 아키텍처 분석](https://d2.naver.com/helloworld/2690975)
* Now?
  * [React Learn: React Compiler](https://react.dev/learn/react-compiler)
