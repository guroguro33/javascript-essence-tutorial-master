import { Person } from './person.js';

const tim = new Person('Tim', 23);
const bob = new Person('Bob', 23);
tim.hello();
bob.hello();

console.log(tim._name)