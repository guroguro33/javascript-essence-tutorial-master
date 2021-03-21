function F(a, b) {
  this.a = a;
  this.b = b;
  // オブジェクトを返す場合は、プロパティは存在せず、prototypeも存在しない？
  // 非オブジェクトを返す場合(voidも同様)はprototypeを__proto__にコピーしてthisの参照先にする
  // return {a: 1};
}

F.prototype.c = function () { };

function newOpe(C, ...args) {
  const _this = Object.create(C.prototype);
  const result = C.apply(_this, args);
  console.log(result, _this);
  if (typeof result === 'object' && result !== null) {
    return result;
  }

  return _this;
}

const instance = new newOpe(F, 1, 2);
console.log(instance);