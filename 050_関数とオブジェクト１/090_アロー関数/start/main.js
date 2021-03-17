function a(name) {
  return 'hello' + name;
}

const b = function (name) {
  return 'hello ' + name;
}

// bをアロー関数にすると引数１つだとカッコ省略可、return省略可
const c = name => 'hello ' + name;
console.log(c('Tom'));