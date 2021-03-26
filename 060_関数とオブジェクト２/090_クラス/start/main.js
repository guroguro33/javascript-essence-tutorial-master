class Person {
  // constructorでコンストラクター部分を記述
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // hello関数を記述するとprototypeにhelloが追加
  hello(){
    console.log('hello ' + this.name);
  }
}
const taro = new Person('Taro', 23);
console.log(taro);

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.hello = function() {
//   console.log('hello ' + this.name);
// }
