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
1. [What is the scope chain?](#scope-chain)
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
**may be worth re-doing with more permanent notes**
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

[back to top](#top)
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

[back to top](#top)

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

[back to top](#top)

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

[back to top](#top)

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
- any variable declared outside of a function is a global variable
- all global variables are actually a property of the window object
- function or local scope variables

```js
function moo() {
	var foo = 1;
}
console.log(foo) // Uncaught ReferenceError:

```
- BUT...don't be confused with "block-level scope" which is something that JavaScript does not have; see below:

```js
for(var i = 1; i < 5; i++) {
    var j = 5;
}

console.log(i);
console.log(j);
```
- both `i` and `j` will be printed because JavaScript does not have block-level scope. We are
creating global variables `i` and `j`;

[back to top](#top)

<a name='hoisting'></a>
### Lecture 9: What is variable hoisting?
- JavaScript automatically moves all variable and function declarations to the top of the scope.
  - So in a global scope, it'd be the top of the page.
  - in a function, it's at the top of the function

```js
"use strict"

console.log(c) // undefined is consoled out
var c = 1;
```
- but this is what JavaScript is actually doing:

```js
"use strict"
var c;
console.log(c);
c = 1;
```
- hoisting is the pushing up of the declaration to the top of the scope
- the same principle applies to inside a function

[back to top](#top)
<a name='scope-chain'></a>
### Lecture 10: What is the scope chain?
- the scope chain of a function starts by looking at the variables within that function. If it can't
find the variable there, it moves out to any outer functions that it is in and then finally the
global scope.

```js
"use strict";

function foo() {
    console.log(myvar);
}

function goo() {
    var myvar = 1;
    foo();
}

goo();
```
- This is the error we get:

> main2.js:4 Uncaught ReferenceError: myvar is not defined

- JavaScript resolves a variable by looking at its inner scopes and then all outer scopes until the global scope.
- In the example above, `myvar` is defined inside goo() so it is not in foo's scope AND it wasn't defined in the
global scope.


[back to top](#top)
<a name='IIFE'></a>
### Lecture 11: What is an IIFE and why might you use it?
- IIFE = Immediately Invoked Function Expression and is pronounced "iffy"
- we are trying to solve the problem of polluting the global scope with variables that we don't use
or accidentally over-write variables that we want
- One thing we could do is to create a function and then immediately call it:

```js
"use strict"

function otherScope() {
  var thing = {'hello': 'other'};
  console.log('other: ', thing);
}
otherScope();
```
  - in the above example, the variable we created `thing` won't overwrite our other variable `thing`
  - This works but there is a quicker way:

```js
"use strict"

(function() {
  var thing = {'hello': 'other'};
  console.log('other: ', thing);
})();
```
  - the code above declares and then immediately calls the function.
- To convert from a regular function to an IIFE:
  1. remove the function name: `function otherScope(){` becomes `function(){`
  1. remove the function call: `otherScope()` is deleted
  1. wrap the whole function in parentheses: `(function(){ ... CODE ...})`
  1. add open and close parentheses to immediately call: `(function(){ ... CODE ...})();`
- Asim actually recommends wrapping all the content of all the files that we are running in an
IIFE to remove any global variables

[back to top](#top)
<a name='closures'></a>
### Lecture 12: What are function closures?
- Here is a long definition of a closure that I will have to flesh out more later:

> A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain. 
The closure has three scope chains: it has access to its own scope (variables defined between its 
curly brackets), it has access to the outer function's variables, and it has access to the global variables.

```js
"use strict";

function sayHello(name) {
    var text = "Hello " + name;
    return function() {
        console.log(text);
    }
};

var sayAsim = sayHello("Asim");
sayAsim();
```
- This is where we are:
  - in the above code, the sayHello function is returning an anonymous function that simply console.log's
  the variable `text`
  - We set the variable `sayAsim` equal to `sayHello('Asim')`. So now when we call `sayAsim()`, it 
  logs "Hello Asim".
- After the `sayHello()` function has returned, the `text` variable should have been deleted or "unavailable"
to `sayAsim()`...**so what is happening here?**
- the function that is returned **keeps a reference** to the `text` variable
- **a closure is a special set of references to variables that a function needs in order to execute**
- Closures can refer to variables in outer scopes

```js
// FIRST ITERATION: Introducing the closure problem
"use strict";

var foo = [];
for(var i = 0; i < 10; i++) {
    foo[i] = function() { return i};
}

console.log(foo[0]());  // 10
console.log(foo[1]());  // 10
console.log(foo[2]());  // 10
```
  - as you can see, this is tricky...we may think that it would log 1, 2, 3, etc. but it isn't
  - Remember that with closures, you aren't getting a **copy** of `i` but a reference to it
  - This function is not doing really what we wanted it to do. Here's one thing I tried that did NOT
  work:

```js
// SECOND ITERATION: Colin's attempt (fails)
"use strict";

var foo = [];
for(var i = 0; i < 10; i++) {
    foo[i] = function() { 
        var y = i;
        return y;
    };
}

console.log(foo[0]());  // 10
console.log(foo[1]());  // 10
console.log(foo[2]());  // 10
```
  - I thought declaring a new variable would work somehow but it doesn't. I needed to use an IIFE:

```js
// THIRD ITERATION: IIFE
"use strict";

var foo = [];
for(var i = 0; i < 10; i++) {
    (function(){
        var y = i;
        foo[i] = function() { return y };
    })();
}

console.log(foo[0]());  // 0
console.log(foo[1]());  // 1
console.log(foo[2]());  // 2
```
  - I could also do it this way:

```js
// FOURTH ITERATION: Improved IIFE
"use strict";

var foo = [];
for(var i = 0; i < 10; i++) {
    (function(y){
        foo[y] = function() { return y };
    })(i); // passing in i as a variable
}

console.log(foo[0]());
console.log(foo[1]());
console.log(foo[2]());
```
  - I removed the variable `y` declaration and instead made it the variable that the IIFE accepts. I pass
  the variable `i` in by including it inside the parentheses at the bottom of the IIFE call: `})(i);`
  - Because primitives are passed by value and NOT by reference, `y` is really just a copy of `i` so we avoid
  that problem from our first iteration where each function is referencing the same `i` variable

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


# Quizzes

## Quiz 3
- `a = 1` without "use strict" will not throw an error but declare a global variable called "a"
  - Q: Why are global variables so bad? Why should they be avoided?
- 'null' is its own type BUT `console.log(typeof(null))` print out "object", an error in JavaScript
that is already too late to fix.

```js
"use strict";

var name = 'igloo';

var code = "var name = 'asim';";
eval(code);
console.log(name) // igloo
```
- Because we are in "use strict" mode, the name variable does not leak out and it remains 'igloo'

```js
var salary = "1000$";

(function() {
    console.log("Original salary was " + salary);
    var salary = "5000$";
    console.log("My new salary is " + salary);
})();
```
  - the first console.log() here will log "Original salary was undefined"
  - What's happening is that `salary` is being hoisted to the top of the IIFE (`var salary;`) and it is undefined
  WITHIN THE IIFE.
  - Despite `salary` be defined in the global scope, its the inner salary that the IIFE is looking for because it
  was hoisted up to the top.
  - To get this to work, we can simply change the inner `salary` declaration to `var sal = "5000$` instead, 
  that way when the IIFE doesn't find `salary` in its inner scope and has to go to the global scope to get it.
