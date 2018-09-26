// Person constructor
function Person(first_name, last_name) {
	this.first_name = first_name;
	this.last_name = last_name;
};
// Method #1: Instantiating a new Person
var dude = new Person("asim", "hussain");
// WRONG => this throws an error:
var dude = Person("asim", "hussain");
// Method #2: Instantiating a new Person
var dude = {};
Person.call(dude, "asim", "hussain");


// Prototype Pattern
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

// Version #1: creating an instance
var asim = Object.create(Person);
asim.init("asim", "hussain");

// Version #2
var asim = Object.create(Person, {
	first_name: {
		value: "Asim"
	}, 
	last_name: {
		value: "Hussain"
	}
});

// Version #3: we'd need to create the PersonFactory IN ADDITION TO
// the Prototype Pattern "Person" object
function PersonFactory(first_name, last_name) {
	var person = Object.create(Person);
	person.first_name = first_name;
	person.last_name = last_name;
	return person;
}
var asim = PersonFactory("asim", "hussain");