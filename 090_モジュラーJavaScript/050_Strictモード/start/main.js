// 'use strict'
// a = 0;
// console.log(a);

function fn() {
  // 'use strict'
//   b = 0;
  return this;
}
console.log(fn.call(2)) // strictモードだとプリミティブ型の2、じゃないとオブジェクトの2

fn();
console.log(b);
