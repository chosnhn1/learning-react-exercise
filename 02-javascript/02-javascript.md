# JavaScript for React

* (Already using JS - so only check them briefly)

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
