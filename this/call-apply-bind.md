# JavaScript `call`, `apply`, and `bind`

`call`, `apply`, and `bind` are methods available on functions. They let us control the value of `this` when a regular function runs.

```js
function abcd(a, b, c) {
  console.log(this, a, b, c);
}

const obj = {
  name: "Harsh",
  age: 26,
};
```

The object passed as the first argument becomes `this` inside `abcd`.

## `call`

`call` invokes the function immediately. The first argument sets `this`, and the remaining arguments are passed one by one.

```js
function abcd(a, b, c) {
  console.log(this.age, a, b, c);
}

const obj = {
  name: "Harsh",
  age: 26,
};

abcd.call(obj, 1, 2, 3);
// 26 1 2 3
```

General syntax:

```js
functionName.call(thisValue, argument1, argument2, argument3);
```

The return value from the function is returned by `call`:

```js
function getName() {
  return this.name;
}

const name = getName.call(obj);
console.log(name); // Harsh
```

Calling `abcd.call()` without an object does not make `this` equal to `obj`; it uses the normal rules for the current JavaScript mode.

## `apply`

`apply` also invokes the function immediately and sets `this`. Its difference is that the function arguments are supplied as one array-like value.

```js
function abcd(a, b, c) {
  console.log(this.age, a, b, c);
}

const obj = {
  name: "Harsh",
  age: 26,
};

abcd.apply(obj, [1, 2, 3]);
// 26 1 2 3
```

General syntax:

```js
functionName.apply(thisValue, [argument1, argument2, argument3]);
```

`apply` is useful when the arguments already exist in an array:

```js
function add(a, b, c) {
  return a + b + c;
}

const numbers = [10, 20, 30];
const total = add.apply(null, numbers);
console.log(total); // 60
```

For modern JavaScript, spread syntax is often easier to read for this use case:

```js
const total = add(...numbers);
```

## `bind`

`bind` does not call the function immediately. It creates and returns a new function with `this` permanently set to the supplied object.

```js
function abcd(a, b, c) {
  console.log(this.age, a, b, c);
}

const obj = {
  name: "Harsh",
  age: 26,
};

const boundAbcd = abcd.bind(obj, 1, 2, 3);
boundAbcd();
// 26 1 2 3
```

General syntax:

```js
const newFunction = functionName.bind(thisValue, argument1, argument2);
newFunction(argument3);
```

Arguments given during `bind` are remembered. This is called **partial application**:

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

## Comparing the Three

| Method | Runs immediately? | Arguments format | Returns |
| --- | --- | --- | --- |
| `call` | Yes | Separate arguments | Function result |
| `apply` | Yes | One array or array-like value | Function result |
| `bind` | No | Separate arguments, optionally pre-filled | New function |

## Reusing One Function with Different Objects

The same function can work with different objects by changing its `this` value:

```js
function introduce(greeting) {
  return `${greeting}, my name is ${this.name}`;
}

const firstUser = { name: "Harsh" };
const secondUser = { name: "Anuj" };

console.log(introduce.call(firstUser, "Hello"));
console.log(introduce.call(secondUser, "Hello"));
```

Output:

```text
Hello, my name is Harsh
Hello, my name is Anuj
```

## Fixing a Detached Method

When an object method is stored in a variable, the object is no longer before the dot and the method can lose its `this` value:

```js
const user = {
  name: "Harsh",
  sayName() {
    console.log(this.name);
  },
};

const detachedMethod = user.sayName;
// detachedMethod(); // loses user as this
```

Use `bind` to create a safe callback:

```js
const safeMethod = user.sayName.bind(user);
safeMethod(); // Harsh
```

This is especially useful with timers and event listeners:

```js
setTimeout(user.sayName.bind(user), 1000);
```

## `call` and `apply` Do Not Change Arrow Function `this`

Arrow functions capture `this` from their surrounding scope. They do not have their own `this`, so `call`, `apply`, and `bind` cannot replace it.

```js
const arrow = () => this;
const obj = { name: "Harsh" };

console.log(arrow.call(obj)); // surrounding this, not obj
console.log(arrow.apply(obj)); // surrounding this, not obj
console.log(arrow.bind(obj)()); // surrounding this, not obj
```

Use a regular function when the caller must control `this`:

```js
function regularFunction() {
  return this.name;
}

console.log(regularFunction.call(obj)); // Harsh
```

## Practical Example

```js
const user = {
  name: "Harsh",
  age: 26,
};

function showUser(city, country) {
  return `${this.name} is ${this.age} and lives in ${city}, ${country}`;
}

console.log(showUser.call(user, "Delhi", "India"));
console.log(showUser.apply(user, ["Delhi", "India"]));

const showHarsh = showUser.bind(user, "Delhi");
console.log(showHarsh("India"));
```

All three calls use `user` as `this`. The only difference is when the function runs and how its arguments are supplied.

## Common Mistakes

1. `call` and `apply` run the function now; they do not return a reusable function.
2. `bind` returns a function; it does not run the original function immediately.
3. The first argument is the `this` value, not a normal function argument.
4. `call` receives arguments separately, while `apply` receives one array-like collection.
5. Arrow functions cannot have their `this` changed with these methods.
6. `bind` returns a new function, so comparing it with the original function gives `false`.

```js
function greet() {}
const boundGreet = greet.bind({});

console.log(boundGreet === greet); // false
```

## One-Line Summary

- `call`: run now with `this` and separate arguments.
- `apply`: run now with `this` and an arguments array.
- `bind`: create a new later-running function with fixed `this`.
