const array = [1, 2, 3, 4, 5];

// 後ろに要素を追加
array.push(6);

// 後ろに結合
// const array2 = array.concat([7, 8, 9, 10])
// スプレッド演算子を使った方がベター
const array2 = [0, ...array, 7, 8, 9, 10, 11];

// 後ろの要素を削除
const result = array.pop();

// 最初の要素を削除
// const result = array.shift();

// 最初に要素を追加、結果の配列の長さを返す
// const result = array.unshift(0);

// 切り取り 第３引数以降は要素を追加する
// const result = array.splice(0, 3, 2, 3, 4);

console.log(array, result);
console.log(array2);