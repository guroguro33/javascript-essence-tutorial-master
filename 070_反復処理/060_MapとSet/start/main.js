const map = new Map();

// オブジェクトをキーに設定
const key1 = {};
map.set(key1, 'value1');
console.log(map.get(key1));

// 関数をキーに設定
const key2 = function () { };
map.set(key2, 'value2');
console.log(map.get(key2));

// プリミティブ型をキーに設定
let key3 = 0;
map.set(key3, 'value3');
console.log(map.get(key3));

// 削除するときはdelete
map.delete(key3);
console.log(map.get(key3));

for (const m of map) {
  console.log(m); // キーとバリューがまとめて
}

for (const [k, v] of map) {
  console.log(k, v); // キーとバリューをそれぞれ
}

const s = new Set();
s.add(key1);
s.add(key1); // 重複は入らない
s.add(key2);
s.add(key3);
s.delete(key3); // 削除

console.log(s.has(key2)); //hasで確認

// 配列に戻す(2通り)
const array1 = Array.from(s);
const array2 = [...s];

console.log(array1);

for (let k of s) {
  console.log(k); // Setはfor...ofで取り出せる
}