const targetObj = { a: 0 };
const handler = {
  // target Proxyで渡した第一引数(targetObj)
  // prop targetのプロパティの名前
  // value propの新しい値
  set: function (target, prop, value, receiver) {
    console.log(`[set]: ${prop}`);
    target[prop] = value;
    // throw new Error('cannot add prop');
  },
  get: function (target, prop, receiver) {
    console.log(receiver);
    if (target.hasOwnProperty(prop)) {
      return target[prop];
    } else {
      return -1;
    }
    console.log(`[get]: ${prop}`);
    return target[prop];
  },
  deleteProperty: function (target, prop) {
    console.log(`[delete]: ${prop}`);
    delete target[prop];
  },
}

const pxy = new Proxy(targetObj, handler);
pxy.a = 10;

console.log(pxy.a);

delete pxy.a;