function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.hello = function() {
  console.log('hello ' + this.name);
}

function Japanese(name, age, gender) {
  // プロパティ継承
  Person.call(this, name, age);
  // プロパティ追加
  this.gender = gender;
}
// prototype継承
Japanese.prototype = Object.create(Person.prototype);

// オーバーライド
Japanese.prototype.hello = function () {
  console.log('Konnichiwa ' + this.name);  
}

// メソッド追加
Japanese.prototype.bye = function () {
  console.log('Sayonara ' + this.name);
}

const taro = new Japanese('Taro', 23, 'Male');
console.log(taro)
taro.hello()
taro.bye()