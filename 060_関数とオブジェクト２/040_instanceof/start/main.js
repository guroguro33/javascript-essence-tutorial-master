function F(a, b) {
    this.a = a;
    this.b = b;
    // return {a: 1};
}

F.prototype.c = function() {}

const instance = new F(1, 2);
console.log(instance instanceof F);

// やっていることは内部のprototypeの比較
console.log(F.__proto__ === instance.prototype)

function fn(arg) {
  if (arg instanceof Array) {
    arg.push('value');
  } else {
    arg['key'] = 'value';
  }
  console.log(arg);
}

fn({})