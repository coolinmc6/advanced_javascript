<a name='top'></a>
# README

Advanced JavaScript lectures based on Asim Hussain's Udemy course: [https://www.udemy.com/top-javascript-interview-questions-and-answers/](https://www.udemy.com/top-javascript-interview-questions-and-answers/).

**Links:**
[https://github.com/coolinmc6/modern-javascript](https://github.com/coolinmc6/modern-javascript)


**Basics**

1. [What is "use strict" and what does it do?](#strict)
1. [Does JavaScript pass variables by reference or value?](#pass)

**Types & Equality**

1. [What are the different types in JavaScript?](#types)
1. [What is the difference between == and ===?](#equals)
1. [What is NaN and how can we check for it?](#NaN)

**Scopes**

1. [What are the different scopes in Javascript?](#scopes)
1. [What is variable hoisting?](#hoisting)
1. [What is the scope chain?](#scope-chain)
1. [What is an IIFE and why might you use it?](#IIFE)
1. [What are function closures?](#closures)

**Object Orientation**

1. [What does the 'this' keyword mean?](#this)
1. [What do the functions call, bind and apply do?](#call-bind-apply)
1. [What is the prototype chain?](#prototype-chain)
1. [What is the difference between prototypal and classical inheritance?](#inheritance)
1. [What is the Constructor OO pattern (part 1)?](#oo-pattern1)
1. [What is the Constructor OO pattern (part 2)?](#oo-pattern2)
1. [What is the Prototype OO pattern?](#oo-prototype)

**Networks**

1. [What is CORS?](#CORS)
1. [What is JSONP?](#JSONP)

**Events**

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
  - don't let the use of "a" in the `foo()` function confuse you; whether I used `b`, `obj`, etc., 
  the property of the actual object `a` is changed
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
- **Lesson: use the triple equals (===)**

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

- using 'this' outside of any scope, 'this' is Window

```js
console.log(this)         // Window
this.asim = 1;

console.log(this.asim)    // 1
console.log(window.asim)  // 1
console.log(asim)         // 1
```

```js
function checkThis() {
    console.log(this)
};

checkThis();              // Window
```
- so thus far, in these two examples, `this` has referred to the global Window object

```js
var asim = {
    checkThis: function() {
        console.log(this);
    }
}
asim.checkThis();
```
- here, `this` no longer refers to the global Window object but the asim object
- `this` is determined by the calling context, the way in which a function is called
- "use strict" prevents the use of the global window object being used for things that developers typically
wouldn't want to use it for:

```js
var asim = {
    checkThis: function() {
        console.log(this);        // asim object

        function checkOther() {
            console.log(this)     // global Window object => this isn't really what we wanted to do
            this.moo = 1;
        }
        checkOther();

        console.log(this.moo);    // 1
        console.log(window.moo)   // 1 => again, this isn't what you wanted...you wanted the asim object.
    }
}

asim.checkThis();
```
- to solve for this, some people do the following:

```js
var asim = {
    checkThis: function() {
        var self = this;          // declare a new variable, 'self', and set that to 'this'
        console.log(self);

        function checkOther() {
            console.log(self)
            self.moo = 1;
        }
        checkOther();

        console.log(self.moo);
        console.log(window.moo);
    }
}

asim.checkThis();
```
  - by declaring a new variable call self, you don't have to worry about what `this` is referring to. We know
  that `self` refers to the asim object so that all other times that we refer to it
- **revisit and get a better definition of this**

[back to top](#top)
<a name='call-bind-apply'></a>
### Lecture 15: What do the functions call, bind and apply do?
- `this` is determined by context - HOW a function is executed
- functions are actually objects and they can be treated as such
- You can do `console.log(funcName)` to see the properties of your function, funcName, in the console
- You can also add properties to your function like a normal object `funcName.moo = 1`
- `asim.call()` just calls the function. So why use the `call()` method?
  - using `call()` allows you to specify what `this` is...it sets the context
- the parentheses method of calling a function, `asim.checkThis()`, the context is not set and window
becomes your `this`. 
  - in `"use strict"` mode, window does not get passed in and `this` will be set to nothing
- the first parameter to the `call()` method is whatever you want `this` to be followed by the arguments
for the function
- the `apply()` function is another function available ON your functions, for example: `funcName.apply()`
- it is very similar to "call" except for the arguments: the first parameter is your `this` and then
next is an array of arguments
  - `a.apply(1, [2,3,4])` => so '1' is my `this` and 2, 3, 4 are my arguments for my `a` function
- **Why use call vs. apply?**
  - normally you would just use call unless your function takes a variable number of parameters

```js
function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

var x = sum(1,2,3);
console.log(x)                        // 6

var things = [4,1,3,76,84,5,3,1,4,5];
var y = sum.apply(null, things);
console.log(y)                        // 186
```
- this function uses the arguments object which is an Array-like object that doesn't really have any
array methods except `length`
- the first example, `x`, is pretty intuitive
- the second example uses `apply()`. The first argument is your `this` object, which we don't need
and is null, and the second is your array of arguments
- bind is another way to stabilize `this`

```js
var asim = {
  checkThis: function() {
    var checkOther = function() {
      console.log(this)
    }.bind(this)
    checkOther();
  }
}

asim.checkThis();
```
- the example above has a bind `this`, which has a context of `asim`, the object


[back to top](#top)
<a name='prototype-chain'></a>
### Lecture 16: What is the prototype chain?

- every object has a prototype. When looking for a property of an object, it first looks on that
object but then it looks for its prototype. If that prototype is an object, and it looks on that
object until it gets to that object's prototype. This is the prototype chain.

```js
var animal = {
    kind: 'human'
}

var asim = {};
asim.__proto__ = animal;

console.log(animal);        // {kind: "human"}
console.log(asim);          // {}
console.log(asim.kind);     // human
```
  - notice that when I log out `animal`, I get the full object, `{kind: "human"}`
  - when I log out `asim`, which is a prototype of `animal`, I get an empty object, `{}`
  - when I log out `asim.kind`, I get 'human'. That is the prototype chain...the `kind` property
  could not be found in the `asim` object so it went to its prototype, `animal`, where it did
  find the "human" property
- another way to create the `asim` object with the prototype, `animal`, is to use the `Object.create()`
method: `var asim = Object.create(animal);`
  - this will result in the same logs as above
- I can also add my own properties to the object: `var asim = Object.create(animal, { food: { value: "mango"}});`
  - this sytanx allows you to specify the prototype you want (`animal`), and then add additional
  properties. In the above example, we are adding the food property which has a value of "mango"
  - **Note:** this code fails: `var asim = Object.create(animal, { food: "mango"});`. This is my error:
  
> Uncaught TypeError: Property description must be an object: mango
  
- **Summary**
  - objects in JavaScript are linked to others in what's called a prototype chain
  - JavaScript traverses this chain when looking for a property and will only return `undefined` if
  it can't find the property in ANY of the objects in the prototype chain
  - you can manually edit the chain with the `__proto__` property in some browsers (i.e. Chrome)
  - ...but you can also use the `Object.create()` method and manually add properties.  **THIS IS THE**
  **RECOMMENDED WAY**

[back to top](#top)
<a name='inheritance'></a>
### Lecture 17: What is the difference between prototypal and classical inheritance?

- "Classical" inheritance is really talking about the methods of object orientation.
- A "class" that acts as a blueprint or architectual diagram for an object and then you 
need to create an instance of that class
- in JavaScript, inheritance works using prototypes - in prototypal inheritance, new objects are
created using previously created objects.
  - there is a parent "Object" for all objects in JavaScript
- There is a method of JavaScript of emulating the more classical object-oriented form using 
classes and that's called the *Pseudo-Classical Pattern* but, again, it's only faking it...all
inheritance in JavaScript is prototypal

[back to top](#top)
<a name='oo-pattern1'></a>
### Lecture 18: What is the Constructor OO pattern (part 1)?

- this is how you do psuedo-classical inheritance, which mimics in syntax the style the OO 
paradigms in other languages like Java or C++
- come people refer to this as "classical inheritance" but it isn't really. This is really 
the constructor pattern
- we can mimic the pattern using function constructor
- This is my Person constructor that takes two arguments, `first_name` and `last_name`

```js
function Person(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
};
```
- To create a new object, I must instantiate one using the `new` keyword

```js
var dude = new Person("asim", "hussain");
console.log(dude);
```
  - the code below fails because it does NOT have the keyword `new`. Also notice how the context of
  `this` is not set without the `new` keyword
  
```js
// this fails
var dude = Person("asim", "hussain");
console.log(dude);
```
- A new instance of a Person can also be instantiated by doing the following:

```js
var dude = {};
Person.call(dude, "asim", "hussain");
console.log(dude);
```

- We can also add methods to our Person pseudo-class:

```js
function Person(first_name, last_name) {
    
    this.first_name = first_name;
    this.last_name = last_name;
    this.full_name = function() {
        return this.first_name + ' ' + this.last_name;
    }
};

console.log(dude.full_name())       // asim hussain
```
- You can also create functions and add them to the prototype of an object.  **Why is this**
**important?**
  - every new instance of `Person`, we are creating all the same properties and methods. So for
  `dude`, it has three properties: `first_name`, `last_name`, and `full_name()`.
  - The method `full_name()` just produces the Person object's full name but each instance of
  Person essentially re-creates that method, and this creates bloat.
  - Adding a method to the *prototype* of the class can save memory:

```js
Person.prototype.full_name_prototype = function() {
    return this.first_name + ' ' + this.last_name;
}
```
- if you are creating a ton of instances, add your method to the prototype. Per Asim: most of the
time, putting your member functions on the prototype of the pseudo-class is best.
- One advantage to it being on the instance itself is that you can effectively create "private" 
methods or properties available only to that object

[back to top](#top)
<a name='oo-pattern2'></a>
### Lecture 19: What is the Constructor OO pattern (part 2)?

```js
"use strict"

function Person(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
    
};

Person.prototype.full_name = function() {
    return this.first_name + ' ' + this.last_name;
}

function Professional(honorific, first_name, last_name) {
    Person.call(this, first_name, last_name);
    this.honorific = honorific;
}

Professional.prototype.professional_name = function() {
    return this.honorific + " " + this.first_name + " " + this.last_name;
}

var prof = new Professional("Dr.", "Asim", "Hussain");
console.log(prof.professional_name());      // Dr. Asim Hussain
console.log(prof.full_name());              // error
```

> Uncaught TypeError: prof.full_name is not a function

- so our problem is that we're not actually inheriting from the Person class. The `full_name()` method
is not in the prototype chain for Professional.  Here is how we fix that:

```js
// CODE

Professional.prototype = Object.create(Person.prototype);

// CODE
```
- now, although we didn't

[back to top](#top)
<a name='oo-prototype'></a>
### Lecture 20: What is the Prototype OO pattern?

- This is an alternative object-oriented solution for inheritance
- prototypal inheritance is just the prototype chain - there is no classes that we have to worry about
- this is seen as a more natural type of OO programming in JavaScript

```js
"use strict"

var Person = {
    init: function(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
        return this;
    },
    full_name: function() {
        return this.first_name + ' ' + this.last_name;
    }
}

var asim = Object.create(Person);
asim.init("asim", "hussain");
console.log(asim.full_name());
```
- here, we have simply create a Person object `var asim = Object.create(Person)`
- on it we have two functions: `init()` and `full_name()`
- we create the object first and then call `init` to set the `first_name` and `last_name` properties
- Another way to do without the `init` method:

```js
var asim = Object.create(Person, {
  first_name: {
    value: "Asim"
  }, 
  last_name: {
    value: "Hussain"
  }
});
```
- a third way to do it would be:

```js
function PersonFactory(first_name, last_name) {
    var person = Object.create(Person);
    person.first_name = first_name;
    person.last_name = last_name;
    return person;
}

var asim = PersonFactory("asim", "hussain");
console.log(asim.full_name())
```
- when would you use the prototype pattern vs. the pseudo-classical or constructor pattern.
- Constructor Pattern
  - it used everywhere - very popular
  - it will feel more natural
- Prototype Pattern
  - more natural way of doing object orientation in JavaScript



[back to top](#top)
<a name='CORS'></a>
## Networking
### Lecture 21: What is CORS?
- CORS = Cross Origin Resource Sharing
- CORS allows you to break the same origin policy of a browser
- CORS allows you to selectively unblock certain requests
- To enable CORS, the browser will always send the origin to the server and it expects the server
to respond with Access-Control-Allow-Origin: domain (making the request) or a star
- It's not the request that gets blocked it's the promise that gets blocked
- a pre-flight request of HTTP method of type options request
- Access-Control-Request-Method: PUT => the kind of request that we want to do
- To make CORS work, you need to coordinate with the other server you are responding to
- the Access-Control-Allow-Origin must match the domain that you are trying to allow
- Play around with this site: [http://test-cors.org/](http://test-cors.org/)
- **GET Request - No CORS**
  - No changes needed
  - Go to Dev Tools > Network, clear it and then "Send Request"
  - Notice how it's a status code of 200 (it was received) BUT in the console, you get an error
  but CORS is not allowed
  - See how in the Response Headers there is no `access-control-allow-origin` key
  - Q: Who's response is it?
- **I should play around and check out some more examples**


[back to top](#top)
<a name='JSONP'></a>
### Lecture 22: What is JSONP?
- JSONP is the solution to the problem posed by CORS
- JSONP is something that predates CORS
- JSONP only works with GET requests (no PUT, POST, DELETE)

```json
// JSON format
[
  {
    "id": 1,
    "first_name": "Asim", 
    "last_name": "Hussain"
  }
]

// JSONP format
asimFunction([
  {
    "id": 1,
    "first_name": "Asim", 
    "last_name": "Hussain"
  }
])
```
- JSONP wraps json in a function
- a regular script tag does not need to be from the same domain. If the script points to another server, 
it won't be blocked
- When you make a JSONP request, you tell the server to wrap its response in a function that you name
(typically in your request) and inside the function, it contains the JSON response you wanted
- you won't see it in your XHR requests, the browser treats it differently because its a script tag
- Asim created a function that does the following:
  - creates a script tag `var script = document.createElement('script')`
  - changes its source, `src`, to the url that we are looking for
  - appends it to the document's head tag
  - in the url, there is a parameter (`...&callback=processWeather`) that tells Yahoo the name of the
  function we are wrapping our JSON in
  - and then we have a function called `processWeather(data)` that logs the data received
  


[back to top](#top)
## Events
<a name='event-cap'></a>
### Lecture 23: What is the difference between event capturing and bubbling?
- let's say we have:

```html
<!-- WINDOW -->
<html>
  <body class="item">
    <div class="item first">
      <div class="item second">
        <div class="item third">
          <div class="item fourth">Click Me</div>
        </div>
      </div>
    </div>
  </body>
</html>
<!-- WINDOW -->
```
- The event always start from the root (Window), down to the target, and then back up to the root
- So when you click on the button, it actually starts at the Window and travels to the document, the
body, the first div, the second dive, and so on. This is called the Event Capturing Phase.
- It then carries on back up to the root again. This is called the Event Bubbling Phase.
- There are two phases:
  - Phase 1: Event Capturing Phase
  - Phase 2: Event Bubbling Phase
- when you add an event listener, you can choose the phase (Event Capturing Phase or Event Bubbling Phase)

```js
var items = document.getElementsByClassName("item");
for (var i = 0; i < items.length; i++) {
  (function() {
    var y = i;
    items[y].addEventListener('click', function(event) {
      console.log(items[y], event);
    }, true);
  })();
}
```

[back to top](#top)
<a name='stopProp'></a>
### Lecture 24: What is the difference between stopPropagation and preventDefault()?
- `stopPropagation()` stops the event from traveling DOWN the Event Capturing Phase or UP the Event
Bubbling Phase
- it prevents it from moving to the next part
- `preventDefault()` stops the default behavior that the event would have triggered

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

## Quiz 4
- the default for `this` is the global object (which is 'window' in a browser)
- in `"use strict"` mode, the default value of `this` is undefined

```js
"use strict";

var animal = {
  kind: "Cow",
  which: function () {
    console.log(this.kind);
  }
};
animal.which();             // Cow
```
  - in the above example, because the context of the calling function is `animal`, `this` is "Cow"

```js
"use strict";
 
var animal = {
  kind: "Cow",
  which: function () {
    console.log(this.kind);
  }
};
var animalFunc = animal.which;
animalFunc();
```
  - in the above example, we aren't calling the function directly from the animal object so we get an error

> Uncaught TypeError: Cannot read property 'kind' of undefined

```js
"use strict";
function sayHello(last_name) {
  console.log("Hello " + this + " " + last_name);
}
sayHello.call("Asim", "Hussain");       // Hello Asim Hussain
```
  - the `call()` method allows us to set the context for `this`. In this example, we are setting `this`
  to "Asim" so it logs out "Hello Asim Hussain"

```js
"use strict";

function sayHello(last_name) {
  console.log("Hello " + this + " " + last_name);
}.bind("Asim");

sayHello("Hussain");
```
  - this fails: bind can only be used on functions after they have been created and 
  **assigned to a variable**
  - I guess that means I should use bind by doing the below

> Uncaught SyntaxError: Unexpected token .

```js
"use strict";

var sayHello = function(last_name) {
  console.log("Hello " + this + " " + last_name);
}.bind("Asim");

sayHello("Hussain");
```
  - this works: bind can be used on function expressions to fix the value of `this` regardless
  how the function is called later on

## Quiz 5

- this is the constructor pattern. It uses the `new` keyword to generate an instance of a pseudo-class

```js
function Device(kind) {
  this.kind = kind;
}

var product = new Device("music player");
```
- The example below shows a constructor function that references the value that was originally passed in

```js
function Device(kind) {
  this.kind = kind;
  this.printKind = function() {
    console.log(kind);
  }
}

var product = new Device("music player");
product.kind = "radio";
product.printKind();            // music player
```
  - "music player" and not "radio" is logged because

## Quiz 6
- CORS = Cross Origin Resource Sharing
- Before making a non-GET request (i.e. POST, PUT, DELETE), the browser sends a pre-flight OPTIONS
request to see if the browser is allowed to make a particular request
- When we make a POST CORS request, the response to the pre-flight request needs to contain a header with a specific value. This would be an acceptable response for the browser to allow the POST request:
  - `Access-Control-Request-Method: POST, PUT, GET, DELETE`

## Quiz 7
- Event capturing happens first
