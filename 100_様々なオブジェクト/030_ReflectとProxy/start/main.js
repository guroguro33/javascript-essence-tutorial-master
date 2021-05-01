const targetObj = {
  a: 1,
  get value() {
    return this.a;
  }
};

const handler = {
  get: function(target, prop, receiver) {
    console.log(`[get]: ${prop}`);
    if(target.hasOwnProperty(prop)) {
      return Reflect.get(target, prop, receiver);
    } else {
      return -1;
    }
  }
}

const pxy = new Proxy(targetObj, handler);
// Proxy経由のため、getトラップも動作する（処理を追加できる）
console.log(pxy.value); // [get]:value と [get]:a と 1
console.log(pxy.b); // [get]:b と -1