# JavaScript 中級者への道

## オブジェクト

### プロパティへのアクセス方法

- ドット記法
  - obj.name
- ブラケット記法
  - obj['name']

### プロパティが関数の時の呼び出し

- キーに()をつける

```javascript
let obj = {
  prop: function () {
    console.log('value');
  },
};
obj.prop();
```

## 実行コンテキストとは？

### グローバルコンテキスト

- main.js 内直下のコード

1. グローバルオブジェクト
2. this
3. 実行中のコンテキスト内の変数・関数

### 関数コンテキスト

- 関数の{}内部のコード

1. arguments
2. super
3. this
4. 外部変数

### コールスタック

- 実行中のコードがたどってきたコンテキストの積み重ね
- devTool の sources で確認できる

### ホイスティング(宣言の巻き上げ)

- コンテキスト内で宣言した変数や関数定義をコード実行前にメモリーに配置すること
- 関数は定義前に呼び出しても巻き上げて実行可能
- const や let はエラーになる

## スコープ

### グローバルスコープ = window オブジェクト

- 一般的にはスクリプトスコープ(let や const 定義)もグローバルスコープと呼ばれる
- 関数スコープ

```javascript
function a() {
  '関数スコープ内';
}
```

### ブロックスコープ

- let や const は有効になるが、var だと有効にならない

```javascript
if (true) {
  ('ブロックスコープ内');
}
```

### レキシカルスコープ（静的スコープ）

- コードを書く場所によって参照できる変数が変わるスコープ
- 同じスコープ内や属する（親）スコープの変数は参照できるが、別スコープ内の変数は参照できない

### スコープチェーン

- スコープ内にスコープが入っている場合など
- 同じスコープ内の変数を取りにいき、ない場合は上位スコープの変数を取りに行く。
- var を使うと、ホイスティングがあるので注意。

### クロージャ

- 関数内に関数を内包したもの
- カプセル化され、外部から変更できなくなるメリット

### 即時関数()

- 関す定義と同時に一度だけ実行される関数

```javascript
let result = (function (仮引数) {
  return 戻り値;
})(実引数);

let c = (function () {
  console.log('called');

  let privateVal = 0;
  let publicVal = 10; // 一度だけ初期化される

  function privateFn() {
    console.log('privateFn is called');
  }
  function publicFn() {
    console.log('publicFn is called' + publicVal++);
  }

  return {
    // publicVal: publicVal, 同名の場合、下記のように省略可能
    publicVal,
    // publicFn: publicFn これも省略可能
    publicFn,
  };
})();
console.log(c.publicVal);
// console.log(c.privateVal); 呼べない
c.publicFn();
c.publicFn(); // publicValが増えていく
```

## 変数

### let,const と var の違い

| タイプ | 再宣言 | 再代入 | スコープ | 初期化（巻き上げ） |
| ------ | ------ | ------ | -------- | ------------------ |
| let    | ❌     | ⭕️    | ブロック | ❌                 |
| const  | ❌     | ❌     | ブロック | ❌                 |
| var    | ⭕️    | ⭕️    | 関数     | undefined          |

### AND 条件と OR 条件

- A && B && C
- A から調べ、変数が全て truthy であれば、最後の C を返す
- falsy な変数があれば 0 を返す
- A || B || C
- A から調べ、 truthy な変数があれば、すぐそれを返す
- 全部 falsy だと 0 を返す

### プリミティブ型とオブジェクトのコピー

- プリミティブ型のコピー
- 参照先の値がコピーされる
- オブジェクトのコピー
- オブジェクトへの参照がコピーされる 変数 →{...}→ オブジェクトのキー → 値 と参照している

### const と参照

- const でオブジェクトを指定した場合はオブジェクトは変更不可だが、プロパティは OK

```javascript
const a = { prop: 'hello' };
a = {}; // NG
a.prop = 'bye'; // OK
```

### 分割代入

- オブジェクトから特定のプロパティを抽出して、宣言を行う
- 違う変数の参照がはられる。

```javascript
// 定義
let { a, b } = object;

const a = {
  prop: 0,
};

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
    prop2: 0,
  },
};

let { prop1 } = c;
prop1.prop2 = 1;
console.log(c, prop1); // cのprop2は同じ参照のままのため、1になっている
```

## 関数

- 「関数は実行可能なオブジェクトである」

### arguments

- 関数内で自動的に定義され、中には実引数が入っている
- arguments[0]や arguments[1]で呼び出せる

### コールバック関数

- 関数内で呼び出す関数

```javascript
function hello(name) {
  console.log('hello ' + name);
}

function bye() {
  console.log('bye');
}

//cbがコールバック関数
function fn(cb) {
  cb('Tom');
}

// 実行
fn(hello);
fn(bye);
// オブジェクトであるため、引数にも入れられる
fn(function () {
  console.log('callBack');
});
```

### this

- 呼び出し元のオブジェクトへの参照を保持するキーワード
- オブジェクトのメソッドとして実行される場合
  - this -> 呼び出し元オブジェクト
- 関数として実行される場合
  - this -> グローバルオブジェクト

### bind

- bind によって this や引数を固定した新しい関数を作成(実行はしない)
  - bind による this の束縛と言う
- オブジェクト.関数().bind(実行元, 引数);

```javascript
window.name = 'John';

const person = {
  name: 'Tom',
  hello: function () {
    console.log('Hello ' + this.name);
  },
};
person.hello(); // Hello Tom

// bind(person)で、helloの実行元をpersonとしている
const helloTom = person.hello.bind(person);

function fn(ref) {
  ref();
}

fn(helloTom); // Hello Tom

// bindの使用例
function a() {
  console.log('hello ' + this.name);
}

const b = a.bind({ name: 'Tim' });

b(); // hello Tim

function c(name) {
  console.log('bye ' + name);
}

// 第１引数はthisの値、第２引数は関数cの引数を束縛できる
const d = c.bind(null, 'Taro');

// 引数Bobを指定しても、束縛されたTaroが実行される
d('Bob'); // hello Taro
```

### call, apply

- this や引数の参照先を変更するのは bind と同じだが、同時に関数を実行する

```javascript
function a(name1, name2) {
  console.log('hello ' + name1 + ',' + name2);
}

const tim = { name: 'Tim' };

// bindは新しい関数bを生成するのみ
const b = a.bind(tim, 'Bob', 'John');
// 実行は別に行う
b();
// applyとcallは実行まで行う
// applyは関数aの複数の引数を配列で渡す
a.apply(tim, ['Bob', 'John']);
// 第２引数以降で関数aの複数の引数を束縛できる
a.call(tim, 'Bob', 'John');

// applyの実践方法

const array = [1, 2, 3, 4, 5];

// ES5までの方法
// const result = Math.max.apply(null, array);

// ES6からスプレッド演算子が導入
const result = Math.max(...array);
console.log(result);
```

### アロー関数

- 無名関数を記述しやすくした省略記法 () => {};

|           | 無名関数 | アロー関数 |
| --------- | -------- | ---------- |
| this      | ⭕️      | ❌         |
| arguments | ⭕️      | ❌         |
| new       | ⭕️      | ❌         |
| prototype | ⭕️      | ❌         |

```javascript
const b = function (name) {
  return 'hello ' + name;
};

// bをアロー関数にすると引数１つだとカッコ省略可、return省略可
const c = (name) => 'hello ' + name;
console.log(c('Tom'));
```

### アロー関数と this

- アロー関数内の this はレキシカルスコープの値をとる

```javascript
window.name = 'John';

const person = {
  name: 'Tom',
  // sayプロパティの記述方法を覚えておく
  say() {
    console.log('sayプロパティの記述');
  },
  hello: () => {
    // アロー関数内のthisはTomではなくJohnになる
    console.log('Hello ' + this.name);
    const a = () => console.log('Bye ' + this.name);
    a();
  },
};

person.hello();
```

### コンストラクター関数

- function で定義され、new でインスタンス化を行う

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const bob = new Person('Bob', 18);
const tom = new Person('Tom', 23);
const sun = new Person('sun', 20);
```

### prototype

- コンストラクター関数のプロパティを定義
- インスタンス化した際には prototype の参照が**proto**にコピーされる

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  // 以下も可能だが、prototypeの方がメモリ節約になる
  // this.hello = function() {
  //   console.log('hello ' + this.name)
  // }
}

// Personのhello
Person.prototype.hello = function () {
  console.log('hello ' + this.name);
};

const bob = new Person('Bob', 18);

bob.hello();
```

### new 演算子

- オブジェクトを返す場合は、プロパティは存在せず、prototype も存在しない？
- 非オブジェクトを返す場合(void も同様)は prototype を[__proto__]にコピーして this の参照先にする

### instanceof メソッド

- A instanceof F で、A は F のインスタンスか調べる
- やっていることは、`F.__proto__ === instance.prototype`で内部の prototype の比較

```javascript
// argがオブジェクトか配列で処理を変える
function fn(arg) {
  if (arg instanceof Array) {
    arg.push('value');
  } else {
    arg['key'] = 'value';
  }
  console.log(arg);
}

fn({});
```

### 関数オブジェクト

- new Function で関数を生成する。インスタンスとはちょっと違う
- 基本的に function で関数生成するが、まれに文字列から関数を生成するときに使う

```javascript
const fn1 = new Function('a', 'b', 'return a * b * d');
const result = fn1(1, 2);

function fn2(a, b) {
  return a + b;
}
// functionはFunctionのインスタンスである
console.log(fn2 instanceof Function); // true
```

### プロトタイプチェーン

- プロトタイプの多重形成
- proto の中に proto がある。
- 同名のメソッドがあれば、上位のものが優先的に呼ばれる

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.hello = function () {
    console.log('OwnProperty:hello ' + this.name);
  };
}

Person.prototype.hello = function () {
  console.log('Person:hello ' + this.name);
};

Object.prototype.hello = function () {
  console.log('Object:hello ' + this.name);
};

const bob = new Person('Bob', 18);
// まずbobのhelloを探して、なければPersonのhelloを探して、なければObjectのHelloを探す
bob.hello(); // この場合はbobのhelloを実行
```

### hasOwnProperty と in

- A.hasOwnProperty('B')で、A の中に B というプロパティがあるか否か（prototype は見ない）
- 'B' in A で A の prototype を含めた中に B というプロパティがあるか否か

```javascript
const result = bob.hasOwnProperty('age');
console.log(result); // true
console.log('hello' in bob); // true
```

### プロトタイプ継承

- 別のコンストラクター関数のプロトタイプを受け継いで、機能を流用できる

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.hello = function () {
  console.log('hello ' + this.name);
};

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
};

// メソッド追加
Japanese.prototype.bye = function () {
  console.log('Sayonara ' + this.name);
};

const taro = new Japanese('Taro', 23, 'Male');
console.log(taro);
taro.hello();
taro.bye();
```

### クラス

- ES6 から登場し、コンストラクター関数をクラス表記できるようにしたもの
- クラス関数も内部で prototype が動いている

```javascript
class Person {
  // constructorでコンストラクター部分を記述
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // hello関数を記述するとprototypeにhelloが追加
  hello() {
    console.log('hello ' + this.name);
  }
}
const taro = new Person('Taro', 23);
```

### クラス継承

- extends が使える
- constructor 内で super も使える

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  hello() {
    console.log('hello ' + this.name);
  }
}

// 継承
class Japanese extends Person {
  // constructor内でsuperを使う
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }
  // extendでprototype継承は完了済
  // Japaneseクラス特有メソッドを定義
  hello() {
    console.log('Konnichiwa ' + this.name);
  }
  bye() {
    console.log('Sayonara ' + this.name);
  }
}
```

### ビルトインオブジェクト

- コード実行前に JS エンジンによって自動的に生成されるオブジェクト
- String,Object,Number,Function,Math,Boolean,Date,Symbol etc
- プリミティブ型以外、全てオブジェクトのため、prototype にビルトインオブジェクトが入っている

### ラッパーオブジェクト

- プリミティブ値を内包するオブジェクト
- new でオブジェクトとして呼ばなくてもラッパーオブジェクトを内包しているため呼び出し可能

```javascript
// const a = new String('hello');
const a = 'hello';
console.log(a.toUpperCase());

// const b = new Number(100)
const b = 100;
console.log(b.toExponential());
```

### Symbol（ES6 より）

- プロパティーの重複を避けるために、必ず一意の値を返す関数
- プリミティブ型の一つ
- ES5 から上がる際に既存コードを破壊しないためのプロパティ識別子

```javascript
const s = Symbol('hello');
// ブラケット記法でhello関数を追加
String.prototype[s] = function () {
  return 'hello ' + this;
};

const tom = 'Tom';
// helloファンクションを実行
console.log(tom[s]());
```

### プロパティとディスクリプター

- プロパティの内部にある４つの設定値をディスクリプターという
- value 値
- configurable 設定変更可能性
- enumerable 列挙可能性 (for-in で回せるか否か)
- writable 値の変更可能性

```javascript
// use strictを記述するとdefinePropertyで設定した値を変更した場合、エラーになる
'use strict';
const obj = {};

Object.defineProperty(obj, 'prop', {
  configurable: true, // 設定変更
  value: 1, // 値
  writable: true, // 値の変更
});

// definePropertyの場合、writableの初期値がfalseなので初期のままだと変更不可
obj.prop = 2;

// オブジェクトリテラルの場合、全て設定値はtrueとなる
const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
```

### setter と getter

- ディスクリプターには４つの設定値の他に、set と get の２つの設定値がある
- 初期は存在しない(undefined)が、設定すると現れる

```javascript
// ES5までの書き方
function Person1(name, age) {
  this._name = name;
  this._age = age;
}
// クラスに対して下記のように記述するとstatic関数になる
Person1.hello = function () {
  console.log('hello');
};
// getterとsetterの書き方はdefinePropertyを使う
Object.defineProperty(Person1.prototype, 'name', {
  get: function () {
    console.log('hello'); // getterに処理を追加したい時などに使う
    return this._name;
  },
  set: function (val) {
    this._name = val;
  },
});
```

```javascript
// ES6からの書き方
class Person2 {
  // コンストラクター
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }
  // getterとsetter
  get name() {
    console.log('hello');
    return this._name;
  }
  set name(val) {
    this._name = val;
  }
  // static関数
  static hello() {
    console.log('hello');
  }
}
```

### チェーンメソッド

- jQuery のようにメソッドを連続して実行するもの
- メソッド内でインスタンスを return することで、次のメソッドにつなげる

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // return thisでPersonを返すことで、チェーンメソッドになる
  hello(person) {
    console.log(`${this.name} says hello ${person.name}`);
    return this;
  }

  introduce() {
    console.log(`Hi, I'm ${this.name}, ${this.age} years old.`);
    return this;
  }

  shakeHands(person) {
    console.log(`${this.name} shake hands with ${person.name}.`);
    return this;
  }

  bye(person) {
    console.log(`Goodbye, ${person.name}.`);
    return this;
  }
}

const bob = new Person('Bob', 23);
const tim = new Person('Tim', 33);

bob.hello(tim).introduce().shakeHands(tim).bye(tim);
```

## 反復

### for...in

- 列挙可能性プロパティーに対して順不同で反復処理を実行する。
- プロトタイプチェーン内も列挙対象となる。
  - Object.hasOwnProperty()を使う
- symbol で定義したプロパティーは for...in で列挙対象にならない

```javascript
const s = Symbol();
const obj = {
  prop1: 'value1',
  prop2: 'value2',
  prop3: 'value3',
  [s]: 'value4', // 変数をキーに使うときは[]を使う
};

// prototypeを使うと、そのままだとmethodは列挙対象になる
Object.prototype.method = function () {};

// definePropertyで列挙対象から外す
Object.defineProperty(Object.prototype, 'method', {
  enumerable: false,
});

// ディスクリプターのenumerableを確認
const d = Object.getOwnPropertyDescriptor(Object.prototype, 'method');
console.log(d);

for (let key in obj) {
  // enumerableをfalseにしない場合はhasOwnPropertyを使う
  // if (obj.hasOwnProperty(key)) {
  console.log(key, obj[key]); // Symbolは出てこない
  // }
}
```

### for...of

- イテレータを持つオブジェクトの反復操作を行う
- イテレータ...反復可能オブジェクト（String,Array,Map,Set,arguments,etc...）

```javascript
const arry = ['a', 'b', 'c'];

arry[4] = 'e';

// prototypeにmethodを追加しても列挙されない
Object.prototype.method = function () {};

// definePropertyでenumerableをfalseにしても列挙される
Object.defineProperty(arry, 0, {
  enumerable: false,
});
// enumerableはfalse
const d = Object.getOwnPropertyDescriptor(arry, 0);
console.log(d);

// Symbolのイテレータに依存して列挙される
for (let v of arry) {
  console.log(v);
}
```

### Map と Set

|          | Object | Map      |
| -------- | ------ | -------- |
| キー     | 文字列 | 制約なし |
| for...in | ⭕️    | ❌       |
| for...of | ❌     | ⭕️      |

|          | Array | Set |
| -------- | ----- | --- |
| 重複値   | ⭕️   | ❌  |
| for...in | ⭕️   | ❌  |
| for...of | ⭕️   | ⭕️ |

```javascript
const map = new Map();

// オブジェクトをキーに設定
const key1 = {};
map.set(key1, 'value1');
console.log(map.get(key1));

// 関数をキーに設定
const key2 = function () {};
map.set(key2, 'value2');
console.log(map.get(key2));

// プリミティブ型をキーに設定
let key3 = 0;
map.set(key3, 'value3');
console.log(map.get(key3));

// 削除するときはdelete
map.delete(key3);

for (const m of map) {
  console.log(m); // キーとバリューがまとめて
}

for (const [k, v] of map) {
  console.log(k, v); // キーとバリューをそれぞれ
}

const s = new Set();
s.add(key1);
s.add(key1); // 重複は入らない
s.add(key2);
s.add(key3);
s.delete(key3); // 削除

console.log(s.has(key2)); //hasで確認

// 配列に戻す(2通り)
const array1 = Array.from(s);
const array2 = [...s];

for (let k of s) {
  console.log(k); // Setはfor...ofで取り出せる
}
```

### イテレーター

- for...of で取り出せる
- あとでまとめる

```javascript
// 基本形
function genIterator() {
  return {
    next: function () {
      return {
        done: true / false,
        value: 値,
      };
    },
  };
}
```

### ジェネレーター

- イテレーターを生成するための特殊な関数

```javascript
// 基本形
function* gen() {
  if(ループ継続) {
    yield 値: // done:falseでvalueが値
  } else {
    return 値; // done:trueでvalueが値
  }
}
```

### スプレッド演算子

- 反復可能や列挙可能オブジェクトの展開を行う。
- {}や[]の中で使用する

```javascript
let a = [...array];

// オブジェクトを配列に直す
const obj1 = {
  prop1: 'value1',
  prop2: 'value2',
  prop3: 'value3',
};

// ジェネレータを使う
Object.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
};

// スプレッド演算子を配列[]に入れるとイテレータの挙動に従う（配列になる）
const arry3 = [...obj1];
console.log(arry3);
```

### 残余引数

- 日引数に渡された変数を配列にまとめる

```javascript
function(...args)
```

## 非同期処理

- 非同期処理は一時的にメインスレッドから切り離される

### タスクキュー

- 実行待ちの非同期処理の行列 -> 非同期処理の実行順を管理
- 通常の関数などはコールスタックに入り、次々と実行され、コールスタックが空になると、タスクキューに入った非同期処理の内容がコールスタックに入り、実行される。

## promise

- 非同期処理をより簡単に可読性が上がるように書けるようにしたもの
- グローバルコンテキストから処理を切り離して最後に処理したい場合->Promise.resolve().then(function(){})
- setTimeout の処理が終わるのを待ってから処理したい場合->下記のとおり new Promise を使う

```javascript
new Promise(
  同期処理
).then(
  非同期処理（resolveを待つ）
).catch(
  非同期処理（rejectを待つ）
).finally(
  非同期処理（then、またはcatchを待つ）
);
```

```javascript
new Promise(function (resolve, reject) {
  resolve('hello'); // それぞれ結果が違う
  reject('bye'); // それぞれ結果が違う
})
  .then(function (data) {
    // resolveが呼ばれた場合の処理
    console.log(data); // -> "hello"
  })
  .catch(function (data) {
    // rejectが呼ばれた場合の処理
    console.log(data); // -> "bye"
  })
  .finally(function () {
    console.log('修了処理');
  });
```

## Promise チェーン

```javascript
function sleep(val) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(val++);
      resolve(val);
    }, 1000);
  });
}

sleep(0) // 出力0
  .then((val) => {
    return sleep(val); // 出力1 returnでpromiseを返してチェーンにする
  })
  .then(function (val) {
    return sleep(val); // 出力2
  })
  .then(function (val) {
    return sleep(val); // 出力3
  })
  .then(function (val) {
    return sleep(val); // 出力4
  })
  .then(function (val) {
    return sleep(val); // 出力5
  });
```

## 並列処理

- 並列処理する場合は Promise.all(繰り返し処理する引数)を使う
- 全て非同期処理すると１つの処理が終わるのを待ってから次の処理に移るが、パフォーマンスを考えると、並列処理するといい場面がある
- Promise.race を使うと、配列の最初の resolve が帰った直後に then メソッドを実行する
- 新しい Promise.allSettled を使うと、reject の場合にも catch にいかず、then が実行される

```javascript
function sleep(val) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(val++);
      reject(val);
    }, val * 500);
  });
}

// 並列処理する場合はPromise.all(繰り返し処理するもの)を使う
allの中にはpromiseのインスタンスで反復可能なものを入れる;
Promise.all([sleep(2), sleep(3), sleep(4)]).then(function (data) {
  console.log(data); // 2, 3, 4 のあとに [3, 4, 5]と出力
});

// Promise.raceを使うと、配列の最初のresolveが帰った直後にthenメソッドを実行する
Promise.race([sleep(2), sleep(3), sleep(4)]).then(function (data) {
  console.log(data); // 2, 3, 3, 4と出力
});

// Promise.allSettledを使うと、rejectの場合にもcatchにいかず、thenが実行される
// 返ってくる引数もオブジェクトであり、resolveだとstatusはfulfilled、rejectだとstatusはrejected
Promise.allSettled([sleep(2), sleep(3), sleep(4)])
  .then(function (data) {
    console.log(data); // 2, 3, 4 のあとにオブジェクトが出力
  })
  .catch(function (e) {
    console.error(data); // allSettledの場合はrejectでもcatchされない
  });
```

### マクロタスク

- タスクキューと呼んでいたもの
- setTimeout でマクロタスクにタスクを入れている
- マイクロタスクの方が優先される
- 順番が回ってきたら、全てのジョブを実行する

```javascript
// 例
setTimeout;
setInterval;
requestAnimationFrame;
```

### マイクロタスク

- タスクキューとは別で存在する非同期処理の待ち行列 -> ジョブキュー
- Promise でマイクロタスクにタスクを入れている
- コールスタックが空になると、マクロタスクより優先してコールスタックにジョブが入る
- 順番が回ってきたら１つずつタスクを実行（マクロタスクに割り込みをうける）

```javascript
// 例
Promises;
queueMicrotask;
MutationObserver;
```

### Await と Async (ES8)

- Promise をさらに直感的に記述できるようにしたもの

#### Async

- Promise を返却する関数の宣言を行う

#### Await

- Promise を返却する関数の非同期処理が完了するまで待つ

```javascript
function sleep(val) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(val++);
      resolve(val);
    }, 1000);
  });
}

async function init() {
  // awaitを使う関数は必ずasyncを記述
  let val = await sleep(0); // resolveのvalが返却される
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  throw new Error(); // throwでcatchできる
  return val;
}

// initで実行されるが、asyncはpromiseを返却するので、thenが使える
init()
  .then(function (val) {
    // return valのvalが返却される
    console.log('hello:' + val);
  })
  .catch(function (e) {
    console.error(e);
  });
```

### JSON 形式の JS との違い

1. ダブルクォーテーションのみ使用可（シングル ❌）
2. プロパティにもダブルクォーテーション -> "key" : "val"
3. 要素の最後にカンマはつけてはいけない

### fetch

- グローバルオブジェクトの関数で、JSON 形式を取得し、Promise を返す

```javascript
async function fetchUsers() {
  // fetchでresponseを返す。promiseを返すため、awaitが使える
  // awaitでresolveの引数が返ってくる->response
  const response = await fetch('users.json');
  // responseのメソッドjsonを使う。これもpromiseを返す。
  const json = await response.json();
  for (const user of json) {
    console.log(`I'm ${user.name}, ${user.age} years old`);
  }
}
// 実行
fetchUsers();
```

### 例外処理とエラー

- try-catch-finally でハンドリング可能

```javascript
async function fetchUsers() {
  const response = await fetch('users.json');
  // response.okがtrueの時に処理を継続
  if (response.ok) {
    const json = await response.json();
    // データが取れなかった場合にエラーを投げる
    if (!json.length) {
      // カスタムエラーに投げる
      throw new NoDataError('no data found');
    }
    return json;
  }
}

// カスタムエラーを作成
class NoDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoDataError';
  }
}

async function init() {
  try {
    const json = await fetchUsers();
    for (const user of json) {
      console.log(`I'm ${user.name}, ${user.age} years old`);
    }
  } catch (e) {
    // カスタムエラーを使ってハンドリングできる
    if (e instanceof NoDataError) {
      console.error(e);
    } else {
      console.error('Oops, something went wrong');
    }
  } finally {
    console.log('bye');
  }
}
init();
```

## モジュラー（ES6)

### モジュール

- ソースコードを機能毎に分割して、メンテナンスしやすくする仕組み
- 代表的なものに ESM（いーえすもじゅーる）と CJS（こもんじぇいえす）がある

1. CommonJS

- Node.js にある仕組み
  - 読み込み require
  - 書き込み exports
  - 拡張子 .cjs

2. ES Modules

- ECMAScript にあり、ブラウザで実行
  - 読み込み import
  - 書き込み export
  - 拡張子 .mjs

### import と export

```javascript
// 記載方法
// html
// type="module"の場合、deferが自動で付与されている
// 2回以上記述しても、１回しか読み込まれない
<script type="module" src="moduleB.js"></script>;

// moduleA.js
// 出力したい変数や関数を定義
export let publicVal = 0;

export function publicFn() {
  console.log('publicFn called: ');
}

export default 10;

// moduleB.js
// 読み込みたいファイルを記載
// export defaultで出力したものには{}なしで変数名をつける
// 別名をつけるときはas
// webpackを使わない時は.jsをつける
import d_val, { publicVal as val, publicFn as fn } from './moduleA.js';

console.log(val); // 出力:0

fn(); // 出力:publicFn called:

console.log(d_val); // 出力:10
```

### ESModule と即時関数

```javascript
// moduleA

console.log('ESmodule called');

let privateVal = 1;

// publicValがプリミティブ型だとモジュールから使用不可
// オブジェクトにすると呼び出せる
export let publicVal = { prop: 10 };

export function publicFn() {
  console.log('publicFn called: ' + publicVal.prop);
  console.log('publicFn called2: ' + privateVal);
  // プリミティブ型を操作したい場合は関数内で処理すると可能
  privateVal++;
}

function privateFn() {}
```

```javascript
// moduleB

import { publicFn as fn, publicVal as val } from './moduleA.js'; // 出力: ESmodule called

fn(); // publicFn called: 10 publicFn called2: 1
fn(); // publicFn called: 10 publicFn called2: 2

// オブジェクトにするとval.propとして呼び出せるし、++可能
console.log(val.prop++); // 10
console.log(val.prop++); // 11
fn(); // publicFn called: 11 publicFn called2: 3
console.log(val.prop++); // 12
console.log(val.prop++); // 13
```

### モジュールコンテキスト

- モジュール内はグローバルコンテキストではなくモジュールコンテキストになる
- モジュールコンテキストでは this が使用不可
- オブジェクト内で呼び出せばこれまで通り this はオブジェクトになる

### モジュールスコープ

- これまでのスコープはグローバルスコープ、スクリプトスコープ、関数スコープ、ブロックスコープ
- スクリプトスコープがなく、モジュールスコープになる

### Strict モード（ES5)

- 意図しないバグの混入の防止
- 予約語の確保
- コードのセキュア化
- 'use strict'と記述すると strict モードが ON になる
- モジュールファイル内では記述なしで strict モードが ON になる
- class 内では記述なしで strict モードが ON になる

```javascript
// ------main.js---------
// use strictと記述するとstrictモードになる
'use strict';

a = 0; // constなど忘れるとstrictモードではundefinedになる
console.log(a);

function fn() {
  'use strict'; // 関数レベルでのstrictモードもできる
  b = 0; // strictモードではundefined
  return this;
}
console.log(fn.call(2)); // strictモードだとプリミティブ型の2、じゃないとオブジェクトの2

fn();

// ------module.js---------
// 'use strict' と記述しなくても有効になる

// 以下は予約後として定義できない
const implements, interface, package;
```

### ダイナミックインポート

- 新しい記述のため、ブラウザが対応しているか要確認
- 非同期でモジュールをインポートする
- import('モジュール名').then(function(modules)){}で記述

```javascript
import('./moduleA.js').then(function (modules) {
  // importするとpromiseで返ってくるため、thenでつなぐ
  // 引数modulesの中にexportされたプロパティやメソッドが入っている
  console.log(modules);
  modules.publicFn();
});

// promiseで返ってくるため、async-await記述できる
async function fn() {
  const modules = await import('./moduleA.js');
  modules.publicFn();
}
fn();
```

## 様々なオブジェクト

### Proxy（ES6）

- プロパティの操作に独自の処理を追加するためのオブジェクト
- セッターやゲッターに独自の処理を追加できる

```javascript
const targetObj = { a: 0 };

const handler = {
  // target : Proxyで渡した第一引数(targetObj)
  // prop : targetのプロパティの名前
  // value : propの新しい値
  // receiver : Proxy自体
  set: function (target, prop, value, receiver) {
    // このsetをトラップと呼ぶ
    console.log(`[set]: ${prop}`);
    target[prop] = value; // セッター
    // throw new Error('cannot add prop'); // エラーに投げることも可能
  },
  get: function (target, prop, receiver) {
    console.log(receiver);
    if (target.hasOwnProperty(prop)) {
      return target[prop]; // ゲッターだが、プロパティがなければ-1を返すことも可能
    } else {
      return -1;
    }
    console.log(`[get]: ${prop}`);
    return target[prop];
  },
  deleteProperty: function (target, prop) {
    console.log(`[delete]: ${prop}`);
    delete target[prop]; // 消去
  },
};

const pxy = new Proxy(targetObj, handler);
// セッターを実行
pxy.a = 10;
// ゲッターを実行
console.log(pxy.a);
// 消去を実行
delete pxy.a;
```

### Reflect(ES6)

- JS エンジンの内部の汎用的な関数を呼び出すメソッドが格納されているオブジェクト
- 内部メソッドと Reflect
  | 内部メソッド | Reflect |
  | -------- | ----- |
  | [[Get]] | get |
  | [[Set]] | set |
  | [[Delete]] | deleteProperty |
  | [[Construct]] | construct |

- 内部メソッドを呼び出す関数の格納場所

```javascript
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

// セッターゲッターの例
const bob = {
  name: 'Bob',
  _hello: function () {
    console.log(`hello ${this.name}`);
  },
};

const tom = {
  name: 'Tom',
  _hello: function () {
    console.log(`hello ${this.name}`);
  },
  get hello() {
    return this._hello();
  },
};

// ゲッターの呼び出し
tom.hello;
// Reflectを使った呼び出し
// 第３引数にreceiverがセットでき、bindのように使える
Reflect.get(tom, 'hello', bob);
```

- Proxy と合わせて使用するため

```javascript
const targetObj = {
  a: 1,
  get value() {
    return this.a;
  },
};

const handler = {
  get: function (target, prop, receiver) {
    console.log(`[get]: ${prop}`);
    if (target.hasOwnProperty(prop)) {
      return Reflect.get(target, prop, receiver);
    } else {
      return -1;
    }
  },
};

const pxy = new Proxy(targetObj, handler);
// Proxy経由のため、getトラップも動作する（処理を追加できる）
console.log(pxy.value); // [get]:value と [get]:a と 1
console.log(pxy.b); // [get]:b と -1
```

### WeakMap(ES6)

- 弱い参照でオブジェクトを保持するコレクション
- キーは必ずオブジェクト
- キーを削除や変更すると値が削除される（弱参照）ガベージコレクションで削除される
- for...of で反復処理ができない

```javascript
const wm = new WeakMap();

// キーとしてオブジェクトを定義
let o = {};

// setでoをキーにし、値をセット
wm.set(o, 'value1');

// キーにnullを入れると値が削除される
// o = null;

console.log(wm.get(o));
console.log(wm.has(o));
console.log(wm.delete(o));
```

### WeakMap とプライベート変数

- class 内のプロパティは\_name などで表記していたが、外部からアクセスできる
- WeakMap を使ってアクセス不可にできる

```javascript
// ------person.js-------
// WeakMapを定義し、exportしないことで内部のみの変数とする
const wm = new WeakMap();
export class Person {
  constructor(name, age) {
    // wmにコンストラクタをセットする
    wm.set(this, {
      name,
      age,
    });
  }

  hello() {
    // メソッド内でgetで取り出す
    console.log(`hello ${wm.get(this).name}`);
  }
}

// -------main.js---------
import { Person } from './person.js';

const tim = new Person('Tim', 23);
const bob = new Person('Bob', 23);
tim.hello();
bob.hello();

console.log(tim.name); // undefined
```

### JSON

```javascript
// JSON -> Objectに変換
JSON.parse;
// Object -> JSONに変換
JSON.stringify;
```

```javascript
const obj = { a: 0, b: 1, c: 2 };

// 値が1より小さいオブジェクトをカットするメソッド
function replacer(prop, value) {
  if (value < 1) {
    return;
  }
  return value;
}

// オブジェクトをjsonに変換
// objに前処理としてreplacerを使う
const json1 = JSON.stringify(obj, replacer);
// objの前処理を配列でキーを指定できる
const json2 = JSON.stringify(obj, ['a', 'b']);
console.log(json1);
console.log(json2);

// jsonをオブジェクトに変換
const obj1 = JSON.parse(json1);
console.log(obj1);

const obj2 = JSON.parse(json2);
console.log(obj2);
```

### Storage

- ブラウザの保存領域にデータを格納するためのオブジェクト

```javascript
const obj = { a: 10 };
const json = JSON.stringify(obj);

// localStorage.setItemで保存
// 第1引数はキー、第２引数はバリュー
localStorage.setItem('key', json);
// localStorage.getItemで取得
const result = localStorage.getItem('key');

const json2 = JSON.parse(result);
console.log(json2); // {a:10}のオブジェクト
```

### 配列

```javascript
const array = [1, 2, 3, 4, 5];

// ---------要素の処理--------------------------------
// 後ろに要素を追加
array.push(6);

// 後ろに結合
const array2 = array.concat([7, 8, 9, 10]);
// スプレッド演算子を使った方がベター
const array2 = [0, ...array, 7, 8, 9, 10, 11];

// 後ろの要素を削除
const result = array.pop();

// 最初の要素を削除
const result = array.shift();

// 最初に要素を追加、結果の配列の長さを返す
const result = array.unshift(0);

// 切り取り 第３引数以降は要素を追加する
const result = array.splice(0, 3, 2, 3, 4);

// ---------反復処理------------------------------------
// 第１引数：値
// 第２引数：インデックス
// 第３引数：配列自体
array.forEach(function (v, i, arry) {
  console.log(v); // 1 2 3 4 5
});

// 新しい配列を生成 returnで値を加工して格納
const newArray = array.map(function (v, i, arry) {
  return v * 2; // [2, 4, 6, 8, 10]
});

// 新しい配列を生成 returnがtruthyだと値を配列に格納
const filterArray = array.filter(function (v, i, arry) {
  return i >= 1;
});
console.log(filterArray); // [2,3,4,5]

// ---------reduce-------------------------------------
const result = array.reduce(function (accu, curr) {
  console.log(accu, curr);
  return accu + curr;
}, 0); // 第２引数を入れると、それが１ループ目のaccuの初期値になる

console.log(result); // 15
```

## DOM と仮想 DOM

### DOM とは

- HTML を JavaScript から参照・更新するためのインターフェース
- HTML をオブジェクト形式で表したもの
- Vue や React などで仮想 DOM を採用
- 仮想 DOM に変更があると DOM に PATCH されて反映する
- 基本的にはパフォーマンスが良いため、仮想 DOM を保持する

## querySelector

- DOM を取得する

```javascript
document.querySelector('body');
```

## createElement

- DOM を生成する

```javascript
document.querySelector('div');
```

## appendChild

- DOM を子要素に挿入する

```javascript
body.appendChild('div');
```

## createElement

- HTML の中身を記述する

```javascript
div.innerHTML('あいうえお');
```

## setAttribute

- DOM に属性を追加する

```javascript
div.setAttribute('class', 'green');
```

## addEventListener

- DOM にイベントを登録する

```javascript
button.addEventListener('click', () => {
  console.log('クリックされた！');
});
```
