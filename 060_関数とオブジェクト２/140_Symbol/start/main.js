const s = Symbol('hello');
const s2 = Symbol('hello');

console.log(typeof s);
console.log(s == s2);
console.log(s);

const str = new String('Tom');
console.log(str);

String.prototype[s] = function () {
  return 'hello ' + this;
}

const tom = 'Tom';

console.log(tom[s]());
console.log(tom[s]);