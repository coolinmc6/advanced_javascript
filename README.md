# README

Advanced JavaScript lectures based on Asim Hussain's Udemy course: [https://www.udemy.com/top-javascript-interview-questions-and-answers/](https://www.udemy.com/top-javascript-interview-questions-and-answers/).

## Basics
### Lecture 3: What is "use strict" and what does it do?

### Lecture 4: Does JavaScript pass variables by reference or value?
- passing primitive types like numbers, strings and booleans => passed by value
- objects are passed by reference
- What is "pass by value" and "pass by reference"?
- Pass by value => if you change the value of a primitive inside a function the changes won't affect the
value of the outer scope.
  - CM => this makes sense to me. In my head, the outer 'a' is completely different than the inner 'a'. If
  I did something like `a = foo(a)`, that would change the value;
  
```js
var a = 1;
function foo(a) {
    a = 2;
    return a;
}
foo(a);
console.log(a) // 1
```
  - 1 is outputted because a, an integer, is passed by value to the function `foo()`
  - even if we change the value of `a` inside the function, when we console it out, it hasn't changed.
  - In the above example, you aren't actually passing in "a", think of it as you are passing in a copy of "a"
- Pass by reference => this means you are passing in something that POINTS to something else as opposed to a
copy of the actual object

```js
var a = {};
function foo(a) {
    a.moo = false; 
}
foo(a)
console.log(a) // {moo: false} => object was changed
```
  - in this example, the actual object that is being passed in, a, is changed.
  - don't let the use of "a" in the `foo()` function confuse you; whether I used `b`, `obj`, etc., the property
  of the actual object `a` is changed
  - you may be able to change the actual object but you CANNOT change what it's pointing to:

```js
var a = {'moo' : 'too'};
function foo(obj) {
    obj = {'a': 1}
}
foo(a)
console.log(a) // {moo: 'too'}
```
  - notice that when we tried to change what it pointed to, i.e. removed the "moo" property, it didn't work.
  - We can only CHANGE prooperties, not create a whole new object

## Types and Equality
### Lecture 5: What are the different types in JavaScript?
- We have 5 primitives: Boolean, Number, String, Null, Undefined
- and 1 non-primitive: Object
- Boolean => true, false
- Number => `1`, `1.0`
- String => `"a"`, `'a'`
- Null => `null`
- Undefined => `undefined`
- Object => `new Object()`
- we can use `typeof()` to show an item's type
- Q: What is the difference between a dynamically typed language like JavaScript and a statically-typed
language like Java?
  - the types of variables in JavaScript are defined at runtime
  - therefore, we only see the problems at runtime
  - Statically typed languages see these type errors right away if we try to change a variable's type
- There is a difference between null and undefined
- 'undefined' is used by JavaScript for missing parameters, unknown objects, variables that we not defined, 
unkonwn properties of an object
- 'null' on the other hand, is a value that only a human / programmer can set. JavaScript will never set
a value to 'null' so if you see 'null', you can see that
- Both 'null' and 'undefined' in JavaScript each is its own value and type. 
  - Null is a type and the Null type has only one value, 'null'.
  - Undefined is a type and the Undefined type has only one value, 'undefined'
- 



### Lecture 6: What is the difference between == and ===?


### Lecture 7: What is NaN and how can we check for it?


## Scopes


## Object Orientation


## Networking


## Events

