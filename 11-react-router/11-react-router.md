# 11. 리액트 라우터

1. 라우터 사용하기
2. 라우터 프로퍼티
3. 리디렉션 사용하기

[예제 프로젝트](../examples/router/)

## 11.1 라우터 사용하기

* Example Router Plan
  * Homepage
    * About
    * Events
    * Products
    * Contact
  * 404 Fallback

## 11.2 라우터 프로퍼티

* React Router pass props to rendered component
* also hooks for this are available: `useLocation`


### 11.2.1 경로 내포시키기

* use Route component, and make web app structure
* make UI elements for navigation

* Example Structure:
  * home
    * about
      * history
      * services
      * location
    * events
    * products
    * contact
  * hot-potato (404 fallback)

* `Route` component will be used for structuring

`Outlet`

## 11.3 리디렉션 사용하기

* (`Redirect` 컴포넌트 (depreciated) >> `Navigate` )
* [Navigate](https://reactrouter.com/api/components/Navigate#navigate)
* [구 Redirect 컴포넌트 문서](https://v5.reactrouter.com/web/api/Redirect)

* Alternative ways to set routes in application
* `useRoutes` hook
* [useRoutes hook Docs](https://reactrouter.com/api/hooks/useRoutes)

```jsx
// App.jsx
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "about",
      element: <About />,
      children: [
        {
          path: "services",
          element: <Services />
        },
        {
          path: "history",
          element: <History />
        },
        {
          path: "location",
          element: <Location />
        },
      ]
    },
    { path: "events", element: <Events /> },
    { path: "products", element: <Products /> },
    { path: "contact", element: <Contact /> },
    { path: "*", element: <Whoops404 /> },
    {
      path: "services",
      redirectTo: "about/services"
    }
  ]);

  return element;
}
```

### 11.3.1 라우팅 파라미터

* Routing Parameters
* `useParams` hook

```jsx
// ColorDetails.jsx
import { useParams } from "react-router-dom";

export function ColorDetails() {
  // let params = useParams();
  // console.log(params);
  let { id } = useParams();
  let { colors } = useColors();
  let foundColor = colors.find(
    color => color.id === id
  );

  // console.log(foundColor);

  return (
  <div>
    <div
      style={{
        backgroundColor: foundColor.color,
        height: 100,
        width: 100
      }}
    ></div>
    <h1>{foundColor.title}</h1>
    <h1>{foundColor.color}</h1>
  </div>
  );
}
```

* `useNavigate` hook

```jsx
// Color.jsx
// ...
import { useNavigate } from "react-router-dom";

export default function Color({
  // ...
}) {
  // ...
  let navigate = useNavigate();

  return (
    <section
      className="color"
      onClick={() => navigate(`/${id}`)}
    >
      {/* color component here */}
    </section>
  );
} 

```