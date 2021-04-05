const arry = ['a', 'b', 'c'];

arry[4] = 'e';

// prototypeにmethodを追加しても列挙されない
Object.prototype.method = function () { };

// definePropertyでenumerableをfalseにしても列挙される
Object.defineProperty(arry, 0, {
  enumerable: false
})
// enumerableはfalse
const d = Object.getOwnPropertyDescriptor(arry, 0);
console.log(d);

// Symbolのイテレータに依存して列挙される
for (let v of arry) {
  console.log(v);
}