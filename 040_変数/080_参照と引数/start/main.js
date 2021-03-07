let a = 0;

function fn1(arg1) {
  arg1 = 1;
  console.log(a, arg1);
}

fn1(a); // aとarg1は独立している

let b = {
  prop: 0
}

function fn2(arg2) {
  arg2.prop = 1;
  arg2 = {};
  console.log(b, arg2);
}

fn2(b);
