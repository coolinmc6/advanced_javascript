<a name='top'></a>
# README

Advanced JavaScript lectures based on Asim Hussain's Udemy course: [https://www.udemy.com/top-javascript-interview-questions-and-answers/](https://www.udemy.com/top-javascript-interview-questions-and-answers/).

1. [What is "use strict" and what does it do?](#strict)
1. [Does JavaScript pass variables by reference or value?](#pass)
1. [What are the different types in JavaScript?](#types)
1. [What is the difference between == and ===?](#equals)
1. [What is NaN and how can we check for it?](#NaN)
1. [What are the different scopes in Javascript?](#scopes)
1. [What is variable hoisting?](#hoisting)
1. [What is an IIFE and why might you use it?](#IIFE)
1. [What are function closures?](#closures)
1. [What does the 'this' keyword mean?](#this)
1. [What do the functions call, bind and apply do?](#call-bind-apply)
1. [What is the prototype chain?](#prototype-chain)
1. [What is the difference between prototypal and classical inheritance?](#inheritance)
1. [What is the Constructor OO pattern (part 1)?](#oo-pattern1)
1. [What is the Constructor OO pattern (part 2)?](#oo-pattern2)
1. [What is CORS?](#CORS)
1. [What is JSONP?](#JSONP)
1. [What is the difference between event capturing and bubbling?](#event-cap)
1. [What is the difference between stopPropagation and preventDefault()?](#stopProp)

## Basics
<a name='strict'></a>
### Lecture 3: What is "use strict" and what does it do?
- ** may be worth re-doing with more permanent notes **
- it makes debugging easier
- prevents you from accidentally creating global variables
- prevents you from naming variables that will be keywords in future JS verisons
- doesn't let you delete arguments to functions, functions, or variables

```js
// "use strict";

// not Strict mode
function newCode() {
    "use strict";

    // Strict Mode
}

// this would not be allowed as it was never defined anywhere with "var asim ="
asim = 1;

var theVal = 0;

thVal = 1;

if(theVal > 0) {
    console.log('hello')
}

// with eval and no "use strict", a can "leak out"
eval("var a = 1");
console.log(a);
```

<a name='pass'></a>
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
<a name='types'></a>
### Lecture 5: What are the different types in JavaScript?
- We have 5 primitives: Boolean, Number, String, Null, Undefined
- and 1 non-primitive: Object
- Boolean => true, false
- Number => `1`, `1.0`
- String => `"a"`, `'a'`
- Null => `null`
  - `typeof(null)` actually returns "object" and not "null"
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
- This statement `(null == undefined)` evaluates to true, `(null === undefined)` evaluates to false
[top](#top)

<a name='equals'></a>
### Lecture 6: What is the difference between == and ===?
- The triple equals, 'strict equality', checks for both type and equality while the double equals checks
for equality in values
- `0 == '0'` evaluates to true
  - JavaScript forces the 0 on the left to convert to the type on the right, a string.
  - so it is essentially doing: `String(0) == '0'` which is true
  - this is called type coercion
- `false == 'false'` evaluates to false
  - JavaScript actually tries to convert the `'false'` (on the right) to a Boolean
  - `Boolean('false')` evalutes to true so.....`false == Boolean('false')` is really
  `false == true` which is `false`
- [https://dorey.github.io/JavaScript-Equality-Table/](https://dorey.github.io/JavaScript-Equality-Table/)
  - this table shows all the really crazy ways that JavaScript MAY convert certain values for a double equals
  - Lesson: use the triple equals (===)

<a name='NaN'></a>
### Lecture 7: What is NaN and how can we check for it?
- NaN compared to any other value is false (`NaN == false`, `NaN == 1`, etc.)
- But weirdly enough, NaN compared to NaN is also false
  - NaN equal to ANYTHING is always false, even when compared to itself
- `isNaN(NaN)` evaluates to true but see below:

```js
isNaN(NaN) // true
isNaN(1) // evalutes to false; 1 is a number
isNaN("1") // evaluates to false; '1' is a string coerced into a number which makes it false
isNaN("A") // evaluates to true; 'A' is a string but cannot be coerced into a number which makes it true

// BUT REMEMBER:
NaN == "A" // evaluates to false
```
- The question above is complex because `NaN == NaN` is false AND `isNaN()` has the type coercision problems
as shown above. So the question really is, given those two issues, what is the full-proof way of checking if
something is `NaN`?
  - **Answer:** check if it is not-equal to itself. Remember, `NaN == NaN` evaluates to false and thus
  `NaN !== NaN` will evaluate to true. See below:

```js
// Normal values
var a = 1;
a !== a // evaluates to false; everything else in JS, when compared to itself, equals itself

// NaN values
var a = NaN;

a !== a // evaluates to true
```
[back to top](#top)

## Scopes
<a name='scopes'></a>
### Lecture 8: What are the different scopes in Javascript?

[back to top](#top)
<a name='hoisting'></a>
### Lecture 9: What is variable hoisting?

[back to top](#top)
<a name='IIFE'></a>
### Lecture 10: What is an IIFE and why might you use it?

[back to top](#top)
<a name='closures'></a>
### Lecture 11: What are function closures?

[back to top](#top)
## Object Orientation
<a name='this'></a>
### Lecture 14: What does the 'this' keyword mean?

[back to top](#top)
<a name='call-bind-apply'></a>
### Lecture 15: What do the functions call, bind and apply do?

[back to top](#top)
<a name='prototype-chain'></a>
### Lecture 16: What is the prototype chain?

[back to top](#top)
<a name='inheritance'></a>
### Lecture 17: What is the difference between prototypal and classical inheritance?

[back to top](#top)
<a name='oo-pattern1'></a>
### Lecture 18: What is the Constructor OO pattern (part 1)?

[back to top](#top)
<a name='oo-pattern2'></a>
### Lecture 18: What is the Constructor OO pattern (part 2)?

[back to top](#top)
<a name='CORS'></a>
## Networking
### Lecture 21: What is CORS?

[back to top](#top)
<a name='JSONP'></a>
### Lecture 22: What is JSONP?

[back to top](#top)



## Events
<a name='event-cap'></a>
### Lecture 23: What is the difference between event capturing and bubbling?

[back to top](#top)
<a name='stopProp'></a>
### Lecture 24: What is the difference between stopPropagation and preventDefault()?

[back to top](#top)

