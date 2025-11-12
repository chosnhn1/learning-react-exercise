# 8. 데이터 포함시키기 Incorporating Data

* Data as "blood of application"
* cloud, client and local
* fresh data, stale data

1. 데이터 요청하기
  1. 요청으로 데이터 보내기
  2. fetch로 파일 업로드하기
  3. 권한 요청
  4. 데이터를 로컬 스토리지에 저장하기
  5. 프라미스 상태 처리하기
2. 렌더 프롭
3. 가상화된 리스트
  1. fetch 훅 만들기
  2. fetch 컴포넌트 만들기
  3. 여러 요청 처리하기
  4. 값 메모화하기
  5. 폭포수 요청
  6. 네트워크 속도 제한
  7. 병렬 요청
  8. 값 기다리기
  9. 요청 취소하기
4. 그래프QL 소개
  1. 깃허브 그래프QL API
  2. 그래프QL 요청 보내기

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

* Reusable fetch to custom hooks
* If rendering part is reusable, why not?: `Fetch` component
* [Fetch](./Fetch.jsx)

```jsx
function Fetch({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>, 
  renderError = error => (
    <pre>{JSON.stringify(error, null, 2)}</pre>
  )
}) {
  const { loading, data, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}
```

```jsx
// GitHubUser.jsx
// ...
import Fetch from "./Fetch";

export default function GitHubUser({ login }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}

function UserDetails({ data }) {
  return (
    // ...
  );
}
```

This component is flex and customisable like this:

```jsx
<Fetch
  uri={``}
  loadingFallback={<LoadingSpinner />}
  renderError={error => {
    return <p>Something went wrong!</p>;
  }}
  renderSuccess={() => (<>
    <h1>Todo: </h1>
  </>)}
/>
```

Use abstraction "properly" and make your app less complex


### 8.3.3 여러 요청 처리하기 & 8.3.4 값 메모화하기

Web apps make many requests; let's handle them out.

* [useIterator](./useIterator.jsx) custom hook
  * memoized
    * this is less for optimization
    * more for usability

```jsx
const [letter, previous, next] = useIterator([
  "a", "b", "c"
]);
```

* [RepoMenu](./RepoMenu.jsx)

### 8.3.5 폭포수 요청 Waterfall Request

* two requests
  1. user account info
  2. user repo list
* this is called "waterfall"
* let's add layers to this

* `react-markdown` 활용 예제
  * [Repo](https://github.com/remarkjs/react-markdown)

```jsx
const loadReadme = async (login, repo) => {
  const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
  const { download_url } = await fetch(uri).then(res =>
    res.json()
  );
  const markdown = await fetch(download_url).then(res => 
    res.text()
  );

  console.log(`Markdown for ${repo}\n\n${markdown}`);
}
```

* [적용 예시](./RepositoryReadme.jsx)

### 8.3.6 네트워크 속도 제한

* Browser Dev tools: Network speed

### 8.3.7 병렬 요청

* Parallel requests
  * <-> Waterfall requests
    * right now, components are rendered inside other ones
    * GitHubUser > UserRepositories > RepositoryReadme
  * if you want to render them in parallel, components should be located near alongside other ones, not incorporating each other

```jsx
// App.jsx

// ...
export default function App() {
  const [login, setLogin] = useState("username");
  const [repo, setRepo] = useState("a-repo-name");

  return (<>
    <SearchForm value={login} onSearch={setLogin} />
    <GitHubUser login={login} />
    <UserRepositories
      login={login}
      repo={repo}
      onSelect={setRepo}
    />
    <RepositoryReadme login={login} repo={repo} />
  </>)
} 
```


### 8.3.8 값 기다리기

* initialize component with initial values...
* But What if you cannot make a good guess?
  * one solution: just don't render

* Example
  * Each components will be rendered when state value changes and initialized

```jsx
return (<>
  <SearchForm value={login} onSearch={setLogin} />
  {login && <GitHubUser login={login} />}
  {login && (
    <UserRepositories
      login={login}
      repo={repo}
      onSelect={setRepo}
      Virtualized
    />
  )}
  {login && repo && (
    <RepositoryReadme login={login} repo={repo} />
  )}
</>);
```

### 8.3.9 요청 취소하기

* What if, user erase field value, or search nobody?

```jsx
export default function App() {
  // ...

  const handleSearch = login => {
    if (login) return setLogin(login);
    setLogin("");
    setRepo("");
  };

  if (!login) {
    return (
      <SearchForm value={login} onSearch={handleSearch} />
    );
  }

  return (
    <>
      <SearchForm value={login} onSearch={handleSearch} />
      <GitHubUser login={login} />
      <UserRepositories
        login={login}
        repo={repo}
        onSelect={setRepo}
      />
      <RepositoryReadme login={login} repo={repo} />
    </>
  );
}
```

* You have parts conditionally rendered
* But, what if component are unmounted while passing data?
  * especially when user has slow network
* solutions
  * hooks for noticing component mount

```jsx
export function useMountedRef() {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });
  return mounted;
}
```

```jsx
const mounted = useMountedRef();
const loadReadme = useCallback(async (login, repo) => {
  //...

  if (mounted.current) {
    setMarkdown(markdown);
    setLoading(false);
  }
}, []);
```

## 8.4 그래프QL 소개 GraphQL

* [GraphQL]()
  * a method of declare ways of communication
  * making request requires...
    * a HTTP request, as always
    * plus GraphQL query

### 8.4.1 깃허브 그래프QL API

* [Uh-oh...](https://github.blog/changelog/2025-11-07-graphql-explorer-removal-from-api-documentation-on-november-7-2025/)

Request:

```gql
query {
  user(login: "username") {
    id
    login
    name
    location
    avatarUrl
  }
}
```

Response example:

```json
{
  "data": {
    "user": {
      "id": "29udfj-dfheuf",
      "login": "username",
      "name": "User Name",
      "location": "Somewhere, SW",
      "avatarUrl": "https://github.com/username.png"
    }
  }
}
```

* make reusable computation
  * `$login` as socket
  * `repositories` for first 100 repos
  * alias `avatar_url` for `avatarUrl` 

```gql
query findRepos($login: String!) {
  user(login: $login) {
    login
    name
    location
    avatar_url: avatarUrl
    repositories(first: 100) {
      totalCount
      nodes {
        name
      }
    }
  }
}
```


### 8.4.1 그래프QL 요청 보내기
