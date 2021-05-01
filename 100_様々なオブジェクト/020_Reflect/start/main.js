class C {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
// 通常のインスタンス生成
const obj1 = new C(1, 2);
console.log(obj1);

// Reflect関数を用いてインスタンス生成
const obj2 = Reflect.construct(C, [1, 2]);
console.log(obj2);

// セッターゲッターの例
const bob = {
  name: 'Bob',
  _hello: function () {
    console.log(`hello ${this.name}`);
  }
}

const tom = {
  name: 'Tom',
  _hello: function () {
    console.log(`hello ${this.name}`);
  },
  get hello() {
    return this._hello();
  },
}

// ゲッターの呼び出し
tom.hello;
// Reflectを使った呼び出し
// 第３引数にreceiverがセットでき、bindのように使える
Reflect.get(tom, 'hello', bob);
