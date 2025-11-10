# JavaScript for React

* (Already using JS - so only check them briefly)

1. 변수 선언하기
  1. const 키워드
  2. let 키워드
  3. 템플릿 문자열
2. 함수 만들기
  1. 함수 선언
  2. 함수 표현식
  3. 디폴트 파라미터
  4. 화살표 함수
3. 자바스크립트 컴파일하기
4. 객체와 배열
  1. 구조 분해를 사용한 대입
  2. 배열 구조 분해하기
  3. 객체 리터럴 개선
  4. 스프레드 연산자
5. 비동기 자바스크립트
  1. 단순한 프라미스와 fetch
  2. async/await
  3. 프라미스 만들기
6. 클래스
7. ES6 모듈
  1. 커먼JS CommonJS

## 2.3 Compiling

* "Compile" usually means (high) programming lang >> machine lang
* In JavaScript context, compiling == process codes for more compatibility
* [Babel](https://babeljs.io/)

eg. a simple function adding two params

```js
const add = (x=5, y=10) => console.log(x+y);
```

Babel change them like this:

```js
"use strict";

var add = function add() {
  var x = arguments.length <= 0 || arguments[0] === undefined ?
    5 : arguments[0];
  var y = arguments.length <= 0 || arguments[1] === undefined ?
    10 : arguments[1];
  return console.log(x + y);
};
```

Usually compiling is done by automatic build tools like Webpack, Parcel, ...

## 2.4 Objects and Arrays

### 2.4.1 destructuring

### 2.4.2 destructuring in array

### 2.4.3 object literal enhancement

### 2.4.4 spread operator `...`

## 2.5 Asynchronous JS

### 2.5.1 Simple `Promise` & `fetch`

### 2.5.2 `async` & `await`

### 2.5.3 composing `Promise`

## 2.6 Class

* after ES2015
* "Prototype Inheritance": Javascript is "prototype" based language
  * `class` to class-y stuffs with Prototype, only adding "syntatic sugar" to code, making them look like OOP

## 2.7 ES6 Module

`export`

`export default`

`import`

```js
import { print, log } from './text-helpers';  // export ~~
import freel from './mt-freel'; // export default

import { print as p, log as l } from './~~'   // apply other names to imports
import * as fns from './~~~'  // import to other namespace
```

### 2.7.1 CommonJS

little old (but supporting all versions of Node) modularity method:

```js
// on exports:
module.exports = {print, log};

// on imports:
const {print, log} = require('./txt-helpers');
```
