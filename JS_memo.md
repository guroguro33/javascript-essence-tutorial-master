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
