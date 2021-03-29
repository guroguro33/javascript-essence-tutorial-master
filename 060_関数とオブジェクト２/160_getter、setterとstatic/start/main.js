function Person1(name, age) {
	this._name = name;
	this._age = age;
}

Person1.hello = function() {
    console.log('hello');
  }

Object.defineProperty(Person1.prototype, 'name', {
  get: function () {
    console.log('hello');
    return this._name;
  },
  set: function (val) {
    this._name = val;
  }

});

const p1 = new Person1('Bob', 23);
console.log(p1);
// p1.name = 'aaa';
// console.log(p1.name);
// Person1.hello();

class Person2 {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  get name() {
    console.log('hello');
    return this._name;
  }
  set name(val) {
    this._name = val;
  }

  static hello() {
    console.log('hello');
  }
}

const p2 = new Person2('Tom', 29);
console.log(p2);
// Person2.hello();
