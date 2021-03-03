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
