const wm = new WeakMap();

// キーとしてオブジェクトを定義
let o = {};

// setでoをキーにし、値をセット
wm.set(o, 'value1');

// キーにnullを入れると値が削除される
// o = null;
// o = {};

console.log(wm.get(o));
console.log(wm.has(o));
console.log(wm.delete(o));
