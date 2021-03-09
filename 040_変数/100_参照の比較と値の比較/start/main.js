const a = {
  prop: 0
}

const b = {
  prop: 0
}

console.log(a == b); // false 参照比較
console.log(a.prop == b.prop); // true 値の比較