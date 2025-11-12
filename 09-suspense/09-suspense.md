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
  