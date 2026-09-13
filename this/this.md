# JavaScript `this` Keyword

`this` is a special keyword whose value is decided by the **call site**. It is not decided by where a regular function is written.

The most useful question is:

> How was this function called?

Arrow functions are the important exception: they do not create their own `this`; they capture it lexically from the surrounding scope.

## 1. Global Scope

In a classic browser script, top-level `this` is the `window` object:

```js
console.log(this); // window
```

In an ES module, top-level `this` is `undefined`:

```js
// <script type="module">
console.log(this); // undefined
```

In Node.js, the result also depends on the module format and execution context. Always consider the environment before assuming that global `this` is `window`.

## 2. Regular Function Calls

A regular function gets its `this` from the way it is called.

```js
function showThis() {
  console.log(this);
}

showThis();
```

In a classic non-strict browser script, the output is usually `window`. In strict mode, it is `undefined`:

```js
"use strict";

function showThis() {
  console.log(this);
}

showThis(); // undefined
```

Strict mode does not convert `this` to the global object for a plain function call.

## 3. Object Method Calls

When a regular function is called with the object before the dot, `this` is that object:

```js
const user = {
  name: "Harsh",
  age: 26,
  sayAge: function () {
    console.log(this.age);
  },
};

user.sayAge(); // 26
```

The method shorthand has the same `this` behavior:

```js
const user = {
  name: "Harsh",
  sayName() {
    console.log(this.name);
  },
};

user.sayName(); // Harsh
```

`this` points to the object used at the call site, not necessarily the object where the function was originally stored:

```js
const person = {
  name: "Harsh",
  sayName() {
    console.log(this.name);
  },
};

const anotherPerson = { name: "Anuj", sayName: person.sayName };
anotherPerson.sayName(); // Anuj
```

## 4. Detached Methods

Saving a method in a separate variable removes the object call site:

```js
const user = {
  name: "Harsh",
  sayName() {
    console.log(this.name);
  },
};

const detached = user.sayName;
detached(); // undefined in strict mode; global object in a sloppy browser script
```

Use `bind` when a callback must permanently keep a particular object:

```js
const boundSayName = user.sayName.bind(user);
boundSayName(); // Harsh
```

## 5. Event Handlers

With a regular function used as a DOM event handler, `this` is normally the element that received the handler:

```js
const heading = document.querySelector("h1");

heading.addEventListener("click", function (event) {
  console.log(this);          // the h1 element
  console.log(event.currentTarget); // the h1 element
});
```

`event.currentTarget` is often clearer than `this` because it explicitly describes the element whose listener is running.

An arrow callback does not receive element-bound `this`:

```js
heading.addEventListener("click", (event) => {
  console.log(this); // inherited from the surrounding scope
  console.log(event.currentTarget); // still the h1 element
});
```

Use the event object when the callback needs the element and use an arrow function when lexical `this` is intended.

## 6. Constructors and Classes

When a function is called with `new`, JavaScript creates a new object and makes that object the constructor's `this`:

```js
class Abcd {
  constructor() {
    console.log("constructor ran");
    this.a = 12;
  }
}

const value = new Abcd();
console.log(value.a); // 12
```

A class method also receives the instance when called through that instance:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

const user = new User("Harsh");
user.sayName(); // Harsh
```

Class bodies are strict mode by default, so an unbound class method does not fall back to the global object.

## 7. Arrow Functions

Arrow functions do not have their own `this`. They capture `this` from the surrounding function or scope.

This does **not** make an arrow function an object method:

```js
const user = {
  name: "Harsh",
  sayName: () => {
    console.log(this.name);
  },
};

user.sayName(); // usually undefined in a browser script
```

Use a regular method when you need the calling object as `this`:

```js
const user = {
  name: "Harsh",
  sayName() {
    console.log(this.name);
  },
};
```

Arrows are useful inside a regular method because they preserve the method's `this`:

```js
const user = {
  name: "Harsh",
  sayName() {
    const printName = () => {
      console.log(this.name);
    };

    printName(); // Harsh
  },
};

user.sayName();
```

The equivalent nested regular function does **not** preserve the method's `this`:

```js
const user = {
  name: "Harsh",
  sayName() {
    function printName() {
      console.log(this.name);
    }

    printName(); // undefined in strict mode; global lookup in sloppy mode
  },
};
```

To preserve `this` with a regular nested function, use `bind`, or store the value explicitly:

```js
const user = {
  name: "Harsh",
  sayName() {
    function printName() {
      console.log(this.name);
    }

    printName.bind(this)();
  },
};
```

## 8. Explicit Binding: `call`, `apply`, and `bind`

These methods let you choose the `this` value for a regular function:

```js
function introduce(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const user = { name: "Harsh" };

introduce.call(user, "Hello");
introduce.apply(user, ["Hello"]);

const introduceUser = introduce.bind(user, "Hello");
introduceUser();
```

- `call(object, arg1, arg2)` invokes the function immediately.
- `apply(object, [arg1, arg2])` invokes it immediately with an array of arguments.
- `bind(object, ...)` returns a new function for later use.

Arrow functions ignore `call`, `apply`, and `bind` for changing `this`, because their `this` is lexical.

## 9. Quick Reference

| Call form | `this` for a regular function |
| --- | --- |
| `fn()` | `undefined` in strict mode; global object in sloppy mode |
| `obj.fn()` | `obj` |
| `new Fn()` | the new instance |
| `fn.call(obj)` | `obj` |
| `fn.apply(obj)` | `obj` |
| `fn.bind(obj)()` | `obj` |
| DOM listener with `function () {}` | the element receiving the listener |
| Arrow function | inherited from the surrounding scope |

## 10. Common Mistakes

1. Do not assume `this` means the object where a function was defined.
2. Do not use an arrow function as an object method when you need `this` to be that object.
3. Do not detach a method without binding it first if it relies on `this`.
4. Remember that a nested regular function loses the outer method's `this`.
5. Remember that a nested arrow function keeps the outer method's `this`.
6. Use `event.currentTarget` in DOM code when the intended element should be explicit.
7. Check whether the code runs as a classic script, an ES module, browser code, or Node.js code.

## One-Line Rule

**Regular function:** `this` depends on how the function is called.

**Arrow function:** `this` comes from the surrounding lexical scope.
