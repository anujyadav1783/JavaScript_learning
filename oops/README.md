# JavaScript OOP Notes

Object-Oriented Programming (OOP) is a way of organizing code around **objects**. An object combines:

- **Properties**: data or characteristics.
- **Methods**: functions that describe behavior.

For example, a pencil can have a name, price, color, and company. It can also have methods such as `write()` and `erase()`.

## Why OOP?

Without OOP, we may repeat the same properties and functions for every pencil:

```js
const pencil1 = {
  name: "Nataraj",
  price: 10,
  color: "black",
  company: "Nataraj",
};

const pencil2 = {
  name: "Doms",
  price: 10,
  color: "red",
  company: "Doms",
};
```

This becomes difficult to maintain when many objects are required. OOP lets us create a reusable **blueprint** and produce many objects from it.

## Four Common OOP Ideas

### 1. Encapsulation

Keep related data and behavior together inside an object or class.

### 2. Abstraction

Expose the useful interface while hiding unnecessary implementation details.

### 3. Inheritance

Create a new class that reuses properties and methods from an existing class.

### 4. Polymorphism

Allow related objects to respond to the same method name in their own way.

JavaScript supports these ideas through objects, functions, prototypes, and classes.

## Constructor Functions

A constructor function is a normal function used as a blueprint for creating objects.

```js
function CreatePencil(name, price, color, company) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.company = company;
}

const pencil1 = new CreatePencil("Nataraj", 10, "black", "Nataraj");
const pencil2 = new CreatePencil("Doms", 10, "red", "Doms");

console.log(pencil1.name); // Nataraj
console.log(pencil2.color); // red
```

### What does `new` do?

When JavaScript evaluates `new CreatePencil(...)`, it:

1. Creates a new empty object.
2. Connects that object to `CreatePencil.prototype`.
3. Calls `CreatePencil` with the new object as `this`.
4. Returns the new object, unless the constructor explicitly returns another object.

That is why assignments such as `this.name = name` belong to the newly created object.

Constructor functions are conventionally written with a capital first letter.

## Adding Methods with a Prototype

If a method is written inside the constructor, every object receives its own function copy:

```js
function CreatePencil(name, price, color, company) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.company = company;

  this.write = function (text) {
    console.log(text);
  };
}
```

A better approach is to put shared methods on the prototype. Then all instances share one method:

```js
CreatePencil.prototype.write = function (text) {
  const heading = document.createElement("h1");
  heading.textContent = text;
  heading.style.color = this.color;
  document.body.appendChild(heading);
};

CreatePencil.prototype.erase = function () {
  document.querySelectorAll("h1").forEach((element) => {
    if (element.style.color === this.color) {
      element.remove();
    }
  });
};

const pencil = new CreatePencil("Nataraj", 10, "black", "Nataraj");
pencil.write("Hello from the pencil");
pencil.erase();
```

Inside a prototype method, `this` is the instance used before the dot:

```js
pencil.write("Hello"); // this is pencil
```

## The Prototype Chain

Every ordinary JavaScript object can have a prototype. If a property is not found directly on an object, JavaScript searches its prototype, then the prototype's prototype, and so on.

```js
console.log(pencil.hasOwnProperty("name")); // true
console.log(pencil.hasOwnProperty("write")); // false
console.log("write" in pencil); // true
```

`name` is an own property of `pencil`, while `write` is found through `CreatePencil.prototype`.

The chain ends at `null`:

```js
console.log(Object.getPrototypeOf(pencil) === CreatePencil.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

`prototype` and `__proto__` are related but different ideas:

- `CreatePencil.prototype` is the object used as the prototype for instances created with `new CreatePencil()`.
- `Object.getPrototypeOf(pencil)` returns the prototype of the `pencil` object.
- `__proto__` is a legacy accessor; prefer `Object.getPrototypeOf()` and `Object.setPrototypeOf()` in new code.

## Classes

Classes provide cleaner syntax over JavaScript's prototype-based system. They still use prototypes internally.

```js
class CreatePencil {
  constructor(name, company, price, color) {
    this.name = name;
    this.company = company;
    this.price = price;
    this.color = color;
  }

  write(text) {
    const heading = document.createElement("h1");
    heading.textContent = text;
    heading.style.color = this.color;
    document.body.appendChild(heading);
  }
}

const pencil1 = new CreatePencil("Nataraj", "Nataraj", 10, "black");
const pencil2 = new CreatePencil("Apsara", "Apsara", 15, "blue");

pencil1.write("First pencil");
pencil2.write("Second pencil");
```

A class method is stored on the class prototype, not copied into every instance:

```js
console.log(CreatePencil.prototype.hasOwnProperty("write")); // true
```

Class constructors are special methods. A class can have only one `constructor`, and it runs automatically when the class is called with `new`.

## Class Methods and `this`

```js
class User {
  constructor(name, address, username, email) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.email = email;
  }

  checkRole() {
    return `You are a ${this.role}`;
  }

  write(text) {
    const heading = document.createElement("h1");
    heading.textContent = `${this.name}: ${text}`;
    document.body.appendChild(heading);
  }
}
```

A method called as `user.write("Hello")` receives `user` as `this`. If the method is detached, it can lose that context. Use `bind` when passing it as a callback:

```js
const user = new User("Harsh", "Bhopal", "async123", "hey@example.com");
const safeWrite = user.write.bind(user);
```

## Inheritance with `extends`

Inheritance allows a child class to reuse a parent class's constructor and methods.

```js
class Admin extends User {
  constructor(name, address, username, email) {
    super(name, address, username, email);
    this.role = "admin";
  }

  remove() {
    document.querySelectorAll("h1").forEach((element) => {
      element.remove();
    });
  }
}

const admin = new Admin(
  "Harsh",
  "Bhopal",
  "async123",
  "hey@example.com",
);

console.log(admin.checkRole()); // You are a admin
admin.write("Admin message");
admin.remove();
```

### What does `super` do?

- `super(...)` calls the parent class constructor.
- It must be called before using `this` in a derived class constructor.
- `super.method()` calls a method from the parent class.

```js
class Moderator extends User {
  write(text) {
    super.write(`[Moderator] ${text}`);
  }
}
```

This is an example of polymorphism: the child class keeps the same method name but changes the behavior.

## `Object.create()`

`Object.create(parent)` creates a new object whose prototype is `parent`.

```js
const a = {};
const b = Object.create(a);

console.log(Object.getPrototypeOf(b) === a); // true
```

If a property is missing on `b`, JavaScript searches `a`:

```js
const parent = {
  greet() {
    return "Hello";
  },
};

const child = Object.create(parent);
child.name = "Harsh";

console.log(child.name); // Harsh
console.log(child.greet()); // Hello
```

`Object.create(null)` makes an object with no prototype:

```js
const dictionary = Object.create(null);
```

Such an object does not inherit methods like `toString` or `hasOwnProperty`.

## Constructor Functions vs Classes

| Constructor function | Class |
| --- | --- |
| Older, function-based syntax | Modern, clearer syntax |
| Methods can be added manually to `.prototype` | Methods are placed on the prototype automatically |
| Can be called without `new`, although that is usually a mistake | Must be called with `new` |
| Uses `prototype` explicitly | Hides most prototype details |
| Common in older JavaScript code | Preferred for new class-based code |

Both approaches use prototypes and both create objects with `new`.

## `instanceof`

`instanceof` checks whether a constructor's prototype appears in an object's prototype chain:

```js
const pencil = new CreatePencil("Nataraj", "Nataraj", 10, "black");

console.log(pencil instanceof CreatePencil); // true
console.log(pencil instanceof Object); // true
```

It checks the prototype chain, not just the object's property values.

## Static Methods and Properties

Static members belong to the class itself, not to its instances:

```js
class MathHelper {
  static square(number) {
    return number * number;
  }
}

console.log(MathHelper.square(5)); // 25
// new MathHelper().square(5); // TypeError
```

Use a static method for behavior related to the class as a whole rather than one particular object.

## Getters and Setters

Getters and setters allow property-like syntax while running methods behind the scenes:

```js
class Product {
  constructor(price) {
    this._price = price;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }
}

const product = new Product(10);
product.price = 20;
console.log(product.price); // 20
```

## Private Class Fields

A field beginning with `#` is private to the class:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
```

`account.#balance` would be a syntax error outside the class.

## Important Rules

1. Use a constructor or class when many objects share the same structure.
2. Store shared methods on the prototype instead of recreating them per instance.
3. Use `new` with constructor functions and classes.
4. Use `this` to refer to the current instance inside constructors and methods.
5. Call `super()` before using `this` in a derived class constructor.
6. Use `extends` for class inheritance and `Object.create()` for direct prototype delegation.
7. Remember that classes are built on JavaScript's prototype system.
8. Prefer `Object.getPrototypeOf()` over the legacy `__proto__` property.
9. Use composition when objects need to combine behavior without a strict parent-child relationship.
10. Keep objects focused so each class has one clear responsibility.

## Short Summary

```text
Constructor function or class = reusable blueprint
new                         = creates an instance
this                        = current instance during construction/method call
prototype                   = shared object for methods and inherited properties
extends                     = creates a child class
super                       = uses the parent class
Object.create(parent)       = creates an object linked to parent
```
