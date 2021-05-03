const array = [1, 2, 3, 4, 5];

// 第１引数：値
// 第２引数：インデックス
// 第３引数：配列自体
array.forEach(function (v, i, arry) {
  console.log(v);
})

// 新しい配列を生成 returnで値を加工して格納
const newArray = array.map(function (v, i, arry) {
  return v * 2;
})

console.log(newArray);

// 新しい配列を生成 returnがtruthyだと値を配列に格納
const filterArray = array.filter(function (v, i, arry) {
  return i >= 1;
})
console.log(filterArray); // [2,3,4,5]

