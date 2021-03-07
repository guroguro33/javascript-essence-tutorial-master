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
