# 5. React using JSX

1. JSX로 리액트 엘리먼트 정의하기
  1. JSX 팁
  2. 배열을 JSX로 매핑하기
2. 바벨
3. JSX로 작성한 조리법
4. 리액트 프래그먼트
5. 웹팩 소개
  1. 프로젝트 설정하기
  2. 번들 로딩하기
  3. 소스 맵
  4. create-react-app

## 5.1 Defining React Element with JSX

### 5.1.1 Tips

* 내포된 컴포넌트 (component as children)
* `className`
  * JS 예약어 `class` 회피
* JavaScript expression: `{}` evaluation

## 5.4 React Fragment

`<React.Fragment>` & `<></>`

## 5.5 Webpack

* React in production =>
  * JSX <> ESNext?
  * Project dependencies?
  * optimizing Images & CSS?
* For these questions: Broswerify, Gulp, Grunt, Prepack, ...
* [Webpack](https://webpack.js.org/)
  * Webpack is for...
    * Module Bundler
    * Modularity
    * Network Performance
  * Webpack can do...
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

* Example structure: `recipes-app`
  * node_modules
  * package.json
  * package-lock.json
  * index.html
  * /src
    * index.js
    * /data
      * recipes.json
    * /components
      * Recipe.js
      * Instructions.js
      * Ingredients.js

2. Modulize

3. Make Webpack build

* for static build process:

```sh
npm install --save-dev webpack webpack-cli
```

* `webpack.config.js`: default Webpack config file
  * doesn't need it; but you still want to have this for explicit process & customizing
  
```js
// ./webpack.config.js
var path = require("path");

module.exports = {
  entry: "./src/index.js" // entry point for client; Webpack will make dependency graph from there
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js",  // Webpack will create packaged js file to here
  }
};
```

```sh
npm install babel-loader @babel/core --save-dev
```

```js
// ...
module.exports = {
  entry: "./src/index.js"
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js",
  }
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader "}]
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

