
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

function privateFn() {

}