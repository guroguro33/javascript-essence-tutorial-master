import { a } from './moduleA.js';

console.log(a);

console.log(this); // undefined

function fn() {
  console.log(this);
}

fn(); // undefined

const obj = {
  fn
}
obj.fn(); // thisはobj

console.log(window); // windowオブジェクト
