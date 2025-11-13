# 10. 리액트 테스트

1. ESLint
2. 프리티어
3. 리액트 애플리케이션을 위한 타입 검사
4. 테스트 주도 개발
5. 제스트 사용하기
6. 리액트 컴포넌트 테스트하기

## 10.1 ESLint

* Compile Languages v. JavaScript (...as voodoo?)
* Tools for applying rules in JS

* 엄격한 컴파일 언어 v. JS (부두술?)
* 코드를 분석하여 구체적 지침을 부여해주는 도구들

* Hinting / Linting: analyze JS
* JSHint, JSLint
* [ESLint](https://eslint.org/)
  * Code linter for up-to-date JavaScript syntax
  * plugin support
    * eg. we use `eslint-plugin-react`
  * create-react-app (and Vite) include ESLint default

```sh
npm install eslint --save-dev
# or
yarn add eslint --dev
```

* ESLint settings (at the top dir)
  * JSON / YAML
  * also init tool is provided (`eslint --init`)

* `npx eslint --init`
  1. plugins installed in `./node_modules`
  2. dependencies added automatically in `package.json`
  3. make settings file `.eslintrc.json`

Example

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {}
}
```

Check code with ESLint

```sh
# a file
npx eslint sample.js

# full dir (but you will need a ignore file ".eslintignore")
npx eslint .
```

add linting script into package.json

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

### 10.1.1 ESLint 플러그인

* `eslint-plugin-react-hooks`: hooks
* `eslint-plugin-jsx-a11y`: accessibility check

## 10.2 프리티어 Prettier

* [Prettier](https://prettier.io/): a code formatter
  * old days: ESLint also do code formatting
  * nowadays Prettier handles code formatting, ESLint do with code quality things

For start, Prettier needs to be installed globally:

```sh
sudo npm install -g prettier
```

Setting with `.prettierrc` file

```js
{
  "semi": true,
  "trailingComma": none,
  "singleQuote": false,
  "printWidth": 80
}
```

```sh
# checking code
prettier --check "sample.js"

# formatting
prettier --write "sample.js"
```

Integrate Prettier with ESLint
```sh
# e-c-p: turn off all ESLint rules conflicting with Prettier
# e-p-p: Integrate Prettier rules into ESLint
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```

```json
{
  "extends": [
    // ...
    "plugin:prettier/recommended"
  ],
  "plugins": [
    //,
    "prettier"
  ],
  "rules": {
    // ...
    "prettier/prettier": "error"
  }
}
```

### 10.2.2 VSCode에서 프리티어 사용하기

VSCode's settings.json:

```json
{
  "editor.formatOnSave": true
}
```

for other text editors, check: [Editor Integration](https://prettier.io/docs/editors)


## 10.3 리액트 애플리케이션을 위한 타입 검사

### 10.3.1 PropTypes

* `PropTypes`
  * [Repo](https://github.com/facebook/prop-types)
  * at one time included into core React library
  * now it has spun-out
  * but if you want to use it: `npm install prop-types --save-dev`

### 10.3.2 Flow

* Open-source typechecking library by Facebook(Meta)
  * use static type annotation
  * [Flow](https://flow.org/)

```sh
npm install --save flow-bin
```

```json
// package.json
{
  "scripts" {
    // ...
    "flow": "flow"
  }
}
```

```sh
npm run flow init
```

check `.flowconfig`

* flow can be applied part to part
* add `//@flow` to the first line of code
```jsx
//@flow
type Props = {
  item: string,
  cost?: number // selective prop
};

function App(props: Props){
  // ...
}
```

cf. root null

```js
// 1: check root not null with if
const root = document.getElementById("root");
if (root != null) {
  ReactDOM.render(<App />, root);
}

// 2: add root type check
```

### 10.3.3 TypeScript

* Opensource language, superset(inclusive set) of JS made by Microsoft
* [TypeScript](https://www.typescriptlang.org/)

```tsx
type AppProps = {
  item: string;
};

ReactDOM.render(
  <App item="jacket" />,
  document.getElementById("root")
);

/// 
function App({ item }: AppProps) {
  return (<div>
    <h1>{item}</h1>
  </div>)
}
```

* Type inference

## 10.4 테스트 주도 개발 Test Driven Development, TDD

* eg. J. Bender's "Red, Green, Refactor"

1. Write test first
2. Run test and fail (Red)
3. Write code minimum required to pass the test (Green)
4. Refactor code & also test (Gold)

### 10.4.1 TDD와 학습

## 10.5 제스트 사용하기 Jest

* Jest: JS test runner, accessing DOM with JSDOM

```js
// "src/functions.test.js"
// this is test file for "src/functions.js"

// "x2"
test("Multiples by two", () => {
  expect();
});
```

```js
// function.js
export default function timesTwo() {
  // ...
}
```

* Matchers
  * `toBe()`: a value
  * `toEqual()`: array, object
* Group tests
  * `describe()`

```js
// function.test.js
import { timesTwo } from "./functions"
test("Multiples by two", () => {
  // add `toBe` matcher for function test
  expect(timesTwo(4)).toBe(8);
})
```

## 10.6 리액트 컴포넌트 테스트하기

* Tests run in Node.js env
* Node.js doesn't provide DOM API
* Therefore `jsdom` simulates Browser env for test

```jsx
// Star.jsx
import { FaStar } from "react-icons/fa";
export default function Star({ selected = false }) {
  return (
    <FaStar color={selected ? "red" : "grey" } id="star" />
  );
}
```

```jsx
// index.js
import Star from "./Star";
ReactDOM.render(
  <Star />,
  document.getElementById("root");
);
```

```js
// Star.test.js
import React from "react";
import ReactDOM from "react-dom";
import Star from "./Star";

test("renders a star", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Star />, div);
  expect(div.querySelector("svg")).toBeTruthy();

  // failing test example
  expect(div.querySelector("notrealthing")).toBeTruthy();
})
```

`@testing-library`

```js
import { toHaveAttribute } from "@testing-library/jest-dom";

// ...

expect.extend({ toHaveAttribute });

// ...

test(" ... ", () => {
  // ...
  expect(
    div.querySelector("svg")
  ).toHaveAttribute("id", "hotdog");
});
```

* If you want to use more than 2 custom matcher:

```js
import { toHaveAttribute, toHaveClass } from "@testing-library/jest-dom";
expect.extend({ toHaveAttribute, toHaveClass });
expect(you).toHaveClass("evenALittle");
```

* or, instead of `expect.extend`, use `extend-expect` library.
* check `setupTests.js` and check if it is already provided!

### 10.6.1 쿼리

### 10.6.2 이벤트 테스트

### 10.6.3 코드 커버리지 사용하기

* "Code Coverage": reporting how much of the code tested
* with `Instanbul`, Jest report code coverage

```sh
jest --coverage
# or
npm test -- --coverage
```

* 100% coverage is not normal; above 85% is ideal (see M. Fowler "Test-Coverage")