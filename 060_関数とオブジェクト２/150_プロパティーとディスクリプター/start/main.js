// use strictを記述するとdefinePropertyで設定した値を変更した場合、エラーになる
'use strict'
// const obj = { prop: 0 };
const obj = {};

Object.defineProperty(obj, 'prop', {
  configurable: true, // 設定変更
  value: 1, // 値
  writable: true // 値の変更
})

// definePropertyの場合、writableの初期値がfalseなので変更不可
obj.prop = 2;
console.log(obj.prop);

// オブジェクトリテラルの場合、全て設定値はtrueとなる
const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
console.log(descriptor);