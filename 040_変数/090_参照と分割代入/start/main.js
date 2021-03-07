const a = {
  prop: 0
}

let { prop: b } = a; // propではなくbという名前に変更して代入

let { prop } = a;
prop = 1;
console.log(a, prop); // aは変わらず、propは1

// 関数の場合
function fn(obj) {
  let { prop } = obj;
  prop = 1;
  console.log(obj, prop);
}
fn(a); // objはaのまま、propは1

// 多階層のオブジェクトの場合
const c = {
  prop1: {
    prop2 : 0
  }
}

let { prop1 } = c;
prop1.prop2 = 1;
console.log(c, prop1); // cのprop2は同じ参照のままのため、1になっている