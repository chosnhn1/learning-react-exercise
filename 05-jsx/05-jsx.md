# 5. React using JSX

1. JSX로 리액트 엘리먼트 정의하기
2. 바벨
3. JSX로 작성한 조리법
4. 리액트 프래그먼트
5. 웹팩 소개

## 5.1 Defining React Element with JSX

### 5.1.1 Tips

* 내포된 컴포넌트 (component as children)
* `className`
  * JS 예약어 `class` 회피
* JavaScript expression: `{}` evaluation

## 5.4 React Fragment

`<React.Fragment>` & `<></>`

## 5.5 Webpack

[Webpack](https://webpack.js.org/)

Module Bundler

* Modularity
* Network Performance

* Compiling
* Code dividing: rollup / layer
* Code minification
* feature flagging
* Hot Module Replacement (HMR)

### 5.5.1 Settings

1. Build Project

```sh
mkdir recipes-app
cd recipes-app
```

```sh
npm init -y
npm install react react-dom serve
```

2. Modulize

3. Make Webpack build

```sh
npm install --save-dev webpack webpack-cli
```

```js
// ./webpack.config.js
var path = require("path");

module.exports = {
  entry: "./src/index.js"
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js",
  }
};
```

```sh
npx webpack --mode development
```

### 5.5.3 Source Map

```js
// ./webpack.config.js (having source-map)
module.exports = {
  ...
  devtool: '#source-map'
};
```

### 5.5.4 create-react-app

(지금은 depreciated... Vite를 씁시다)

[Vite](https://vite.dev/)

