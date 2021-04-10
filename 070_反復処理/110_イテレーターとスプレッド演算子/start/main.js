const arry1 = [1, 2, 3, 4, 5];
const arry2 = [0, ...arry1, 6];
console.log(arry1 == arry2); // 別の新規の配列
arry2.push(6);
console.log(arry2);

function sum(...args) {
  let ret = 0;
  for (let v of args) {
    ret += v;
  }
  return ret;
}

const result = sum(1, 2, 3, 4);

console.log(result);

// オブジェクトを配列に直す
const obj1 = {
  prop1: 'value1',
  prop2: 'value2',
  prop3: 'value3'
}

// ジェネレータを使う
Object.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
}

// スプレッド演算子が使える（イテレータの挙動に従う）
const arry3 = [...obj1];
console.log(arry3);

// {}でスプレッド演算子を使うとオブジェクトがそのまま返る
const arry4 = { ...obj1 };
console.log(arry4);

