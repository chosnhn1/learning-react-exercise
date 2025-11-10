# 8. 데이터 포함시키기 Incorporating Data

* Data as "blood of application"
* cloud, client and local
* fresh data, stale data

1. 데이터 요청하기
2. 렌더 프롭
3. 가상화된 리스트
4. 그래프QL 소개

## 8.1 데이터 요청하기

* HTTP Request

```js
fetch(`https://api.github.com/users/moonhighway`)
  .then(response => response.json())
  .then(console.log)
  .catch(console.error);

```

```js
async function requestGithubUser(githubLogin) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${githubLogin}`
    );
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
}
```

### 8.1.1 요청으로 데이터 보내기

HTTP request with methods

```js
fetch("/create/user", {
  method: "POST",
  body: JSON.stringify({ username, password, bio })
});
```

### 8.1.2 fetch로 파일 업로드하기

```js
const formData = new FormData();
formData.append("username", "moontahoe");
formData.append("fullname", "Alex Banks");
formData.append("avatar", imgFile);

fetch("/create/user", {
  method: "POST",
  body: formData
});
```

### 8.1.3 권한 요청

Authorization

```js
fetch(`https://api.github.com/users/${login}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

In React Component:

```jsx
function GitHubUser({ login }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!login) return;
    fetch(`https://api.github.com/users/${login}`)
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, [login]);

  if (data)
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  
  return null;
}

export default function App() {
  return <GitHubUser login="moonhighway" />;
}

```

### 8.1.4 데이터를 로컬 스토리지에 저장하기

* 웹 스토리지 API

```js
const loadJSON = key =>
  key && JSON.parse(localStorage.getItem(key));

const saveJSON = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
```

* note: using web storage, parsing and serializing JSON are usually **synchronous** task
  * So watch out for performance

```jsx
// GitHubUser component
const [data, setData] = useState(loadJSON(`user:${login}`));
useEffect(() => {
  if (!data) return;
  if (data.login === login) return;
  const { name, avatar_url, location } = data;
  saveJSON(`user:${login}`, {
    name,
    login,
    avatar_url,
    location
  });
}, [data]);
```

[Completed GitHubUser Component](./GitHubUser.jsx)

* Web Storage: Essential, but makes app complex
* ie. for Content Caching: just add `Cache-Control: max-age=<EXP_DATE>` HTTP header

### 8.1.5 프라미스 상태 처리하기

* 3 Status: Pending, Resolved and Rejected

```jsx
// GitHubUser.jsx
function GitHubUser({ login }) {
  // ...
  const [loading, setLoading] = useState(false);

  // fetch hook
  useEffect(() => {
    if (!login) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`)
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (loading) return <h1>loading...</h1>;
  // ...
}

```

* Handling all three status is burdensome but **necessary**

## 8.2 렌더 프롭 Render Props

Render props: Props that are objects of rendering

```jsx
import React from "react";

const tahoe_peaks = [
  { name: "Freel Peak", elevation: 10891 },
  { name: "Monument Peak", elevation: 10067 },
  { name: "Pyramid Peak", elevation: 9983 },
  { name: "Mt. Tallac", elevation: 9735 },
];

export default function App() {
  return (
    <ul>
      {tahoe_peaks.map((peak, i) => (
        <li key={i}>
          {peak.name} - {peak.elevation.toLocaleString()}ft
        </li>
      ))}
    </ul>
  );
}
```

In this example, you can pass component to List component

```jsx
function List({ data = [], renderEmpty }) {
  if (!data.length) return renderEmpty;
  return <p>{data.length} items</p>;
}

export default function App() {
  return <List renderEmpty={<p>This list is empty</p>} />;
}
```

* [Full example](./tahoe/)
* Abstracting render components

## 8.3 가상화된 리스트 Virtualized List

* Considering rendering list: a big question
  * What if the list is huge...?
    * eg. off-screen render


* Windowing / Virtualization
  * render on screen items
  * additional off-screen render
  * scroll >> unmount / mount items
  * Libraries available:
    * `react-window`
      * https://react-window.vercel.app/
      * https://www.npmjs.com/package/react-window
    * `react-virtualized`
      * https://github.com/bvaughn/react-virtualized
      * https://www.npmjs.com/package/react-virtualized
    * `FlatList` on React Native
      * https://reactnative.dev/docs/flatlist
      * 

* 내가 찾아본 새 패키지들
  * https://tanstack.com/virtual/latest
    * https://www.npmjs.com/package/@tanstack/react-virtual
  * https://virtuoso.dev/
    * https://www.npmjs.com/package/react-virtuoso

## 8.3.1 fetch 훅 만들기

```jsx
// useFetch custom hook
import React, {useState, useEffect } from "react";

export function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (!url) return;
    fetch(uri)
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error
  };
}
```

```jsx
// GitHubUser, the hook consumer
function GitHubUser({ login }) {
  const { loading, data, error } = useFetch(
    `https://api.github.com/users/${login}`
  );

  if (loading) return <h1>loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (<div classname="githubUser">
    <img
      src={data.avatar_url}
      alt={data.login}
      style={{ width: 200 }}
    />
    <div>
      <h1>{data.login}</h1>
      {data.name && <p>{data.name}</p>}
      {data.location && <p>{data.location}</p>}
    </div>
  </div>);
}
```

### 8.3.2 fetch 컴포넌트 만들기

### 8.3.3 여러 요청 처리하기

### 8.3.4 값 메모화하기

### 8.3.5 폭포수 요청 Waterfall Request

### 8.3.6 네트워크 속도 제한

### 8.3.7 병렬 요청

### 8.3.8 값 기다리기

### 8.3.9 요청 취소하기

## 8.4 그래프QL 소개 GraphQL

[GraphQL]

### 8.4.1 깃허브 그래프QL API

### 8.4.1 그래프QL 요청 보내기
