# 12. 리액트와 서버

* Until now we build React app only works on Browser
* React is for View layer (in MVC pattern) so it is appropriate
* But also most apps need backend layer, so react app should be structured with server in mind
* eg. transactions, latency handlings

* "Isomorphic" render: React rendered on platforms other than browsers
  * which means, server renders UI and send it to browser
  * it can be used to enhance app's perf, compatibilty and security


1. 아이소모피즘과 유니버설리즘 비교
2. 서버 렌더링 리액트
3. 넥스트.js를 사용한 서버 렌더링
4. 개츠비
5. 리액트의 미래

## 12.1 아이소모피즘과 유니버설리즘 비교

* Application works both sides of server and client: "Isomorphic" & "universal" (??)
* **Isomorphic**: app rendered on more than one platform
* **Universal**: same code can run on many environments

```js
const userDetails = response => {
  const login = response.login;
  console.log(login);
};
```

code above: universal (both node and browser can run it)

### 12.1.1 클라이언트와 서버 도메인

eg.

```js
fetch("https://api.github.com/users/username")
  .then(res => res.json())
  .then(console.log);
```

* code above cannot run on node: node doesn't support `fetch` natively
* npm `isomorphic-fetch` or node `https` module

* How about Star component?
* `ReactDOM`'s `renderToString()`
```js
// Browser renders Star directly to HTML
ReactDOM.render(<Star />);

// render Star into HTML String
var html = ReactDOM.renderToString(<Star />);
```

* You can make isomorphic application reusing universal javascript code

## 12.2 서버 렌더링 리액트

* Server can render, use all resources client can't get
* also safe, can access security infos

`ReactDOM.hydrate`

* ReactDOMServer renders > rehydrate app with `hydrate`

1. render static version of app
2. request dynamic js
3. switch statics to dynamics
4. App works

## 12.3 넥스트.js를 사용한 서버 렌더링 Next.js

[예제](../examples/project-next/)

* depreciated items
  * [Link](https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor): error when having an anchor
    * new [Link](https://nextjs.org/docs/pages/api-reference/components/link)
  * [getInitialProps](https://nextjs.org/docs/pages/api-reference/functions/get-initial-props)

* glossary
  * CSR
  * SSR
  * rehydrate

## 12.4 개츠비 Gatsby

* [Gatsby](https://www.gatsbyjs.com/)
  * a React-based site generator
* [예제](../examples/pets-gatsby/)

* Static contents
* CDN support
* Reactive / sqquential image placeholder
* prefetch

## 12.5 리액트의 미래

* React's competitors: Angular, Amber, Vue
* Tools like Next.js, Gatsby
* More...
  * React Native: mobile applications
  * GraphQL: declative data fetching
  * Next.js & Gatsby: contents based websites
   