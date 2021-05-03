const array = [1, 2, 3, 4, 5];

const result = array.reduce(function (accu, curr) {
  console.log(accu, curr);
  return accu + curr;
}, 0) // 第２引数を入れると、それが１ループ目のaccuの初期値になる

console.log(result); // 15