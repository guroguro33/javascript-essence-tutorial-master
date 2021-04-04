const s = Symbol();
const obj = {
	prop1: 'value1',
	prop2: 'value2',
  prop3: 'value3',
  [s]: 'value4'
}

// そのままだとmethodは列挙対象
Object.prototype.method = function () { }

// 列挙対象から外す
// Object.defineProperty(Object.prototype, 'method', {
//   enumerable: false
// });

// ディスクリプターを確認
const d = Object.getOwnPropertyDescriptor(Object.prototype, 'method');
const e = Object.getOwnPropertyDescriptor(obj, s);
console.log(d,e);


for (let key in obj) {
  // enumerableをfalseにしない場合はhasOwnProperty
  // if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  // }
}