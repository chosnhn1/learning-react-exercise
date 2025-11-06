## 3.3 Concepts

* Immutability
* Purity
* Transformation: map & reduce
* Higher-order function
* Recursion

### 3.3.1 Immutability

```js
let color_lawn = {
  title: "lawn",
  color: "#00FF00",
  rating: 0
};

// function mutating color_lawn
function rateColor(color, rating) {
  color.rating = rating;
  return color;
}

rateColor(color_lawn, 5);

// immutable function #1 (with Object.assign)
var rateColor = function(color, rating) {
  return Object.assign({}, color, {rating: rating});
};

// immutable function #2 (with Object spread operator)
const rateColor = (color, rating) => ({
  ...color,
  rating
});

```

```js
let list = [
  {title: "vivid red"},
  {title: "lawn"},
  {title: "party pink"}
];

// function mutating original list:
const addColor = function(title, colors) {
  colors.push({ title: title });
  return colors;
};
addColor("green", list);

// function immutable
const addColor = (title, array) => array.concat({title});
addColor("green", list);

```

참고: `Object.freeze`


### 3.3.2 Purity

```js
// data given
const frederick = {
  name: "Frederick Douglass",
  canRead: false,
  canWrite: false
};

// impure function
function selfEducate() {
  frederick.canRead = true;
  frederick.canWrite = true;
  return frederick;
};

// this call change things outside the scope:
selfEducate();
console.log(frederick);

// function having parameters but not yet pure:
const selfEducate = (person) => {
  person.canRead = true;
  person.canWrite = true;
  return person;
};

selfEducate(frederick);
```

```js
// truly pure function:
const selfEducate = (person) => ({
  ...person,
  canRead = true,
  canWrite = true
});

// two values are different: value returned from function call, & original not touched by function
console.log(selfEducate(frederick));
console.log(frederick);
```



```js
// impure function example which mutates DOM, causing side effects:
function Header(text) {
  let h1 = document.createElement('h1');
  h1.innerText = text;
  document.body.appendChild(h1);
}

Header("Header() caused side effects");
```

```jsx
// React express UI elements to pure functions
// So they won't mess with changing DOM
const Header = (props) => <h1>{props.title}</h1>;
```

### 3.3.3 Transformation: `Array.map` and `Array.reduce`

```js
const schools = ["Yorktown", "Washington & Lee", "Wakefield"];

console.log(schools.join(", "));

// filter: receive predicate function(which return bool)
// also filter() is pure function: rather than pop and splice
const wSchools = schools.filter(school => school[0] === "W");

// map: receive transformative function
// return a new array (pure!) with each item transformed
const highSchools = schools.map(school => `${school} High School`);
```

```js
let schools = [
  {name: "Yorktown"},
  {name: "Stratford"},
  {name: "Washington & Lee"},
  {name: "Wakefield"},
];

const editName = (oldName, name, arr) => {
  arr.map(item => {
    if (item.name === oldName) {
      return {
        ...item,
        name
      };
    } else {
      return item;
    }
  });
}


let updatedSchools = editName("Stratford", "HB Woodlawn", schools);
```

```js
const editName = (oldName, name, arr) => arr.map(item => (item.name === oldName ? {...item, name} : item));
```

### 3.3.4 Higher-order function

function that manipulates order functions

```js
const invokeIf = (condition, fnTrue, fnFalse) => (condition) ? fnTrue() : fnFalse();
```

#### Currying

making function waiting other values to be passed

```js
// userLogs return a function needing message to log:
const userLogs = userName => message => console.log(`${userName} -> ${message}`);

// making a function giving userName first:
const log = userLog("grandpa23");

// this function finally do something with message:
log("load fake 20 members");
```

### 3.3.5 Recursion

vs. Loop (`for`)

```js
const countdown = (value, fn) => {
  fn(value);
  return (value > 0) ? countdown(value-1, fn) : value;
};

countdown(10, value => console.log(value));
```


### 3.3.6 Composition

* Chaining

예시 1: String `replace` Chaining

```js
const template = "hh:mm:ss tt";
const clockTime = template.replace("hh", "03")
  .replace("mm", "33")
  .replace("ss", "33")
  .replace("tt", "PM");

console.log(clockTime);
```

예시 2: 여러 함수의 입출력 거치기 (eg. date >> civilianHours >> appendAMPM 을 하는 `both`)
```js
const both = date => appendAMPM(civilianHours(date));
```

예시 3: 2의 개선 - 고차함수 `compose` 도입
```js
const both = compose(
  civilianHours,
  appendAMPM
);

both(new Date());
```

아래 예시의 `compose`는 함수들 (`fns`)을 인자로 받아서 차례로 수행하는 하나의 함수를 반환

```js
const compose = (...fns) => (arg) =>
  fns.reduce((composed, f) => f(composed), arg);
```

### 3.3.7

* 시계 출력 예시
  * [명령형 시계](./clock-imparative.js)
  * [함수형 시계](./clock-functional.js)
  