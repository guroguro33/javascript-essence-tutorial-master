/**
 * 問題：
 * オブジェクトの状態をlocalStorageに保存してみましょう。
 * 以下の要件に従ってlocalStorageに状態を保持するオブジェクト
 * を作成してみてください。
 * 
 * １．オブジェクトの値が変更された場合に
 * オブジェクトをJSONに変換してlocalStorageに
 * 登録します。localStorageに登録する際のキー
 * は"test-data"としてください。
 * 
 * ２．プログラムが実行される際にlocalStorage
 * を指定のキーで検索し、JSONがすでに登録されて
 * いる場合には、そのJSONからオブジェクトを復元し
 * 初期値のオブジェクトとしてください。
 */
const KEY = 'test-data';

class DataSource {
  // localStorageから出し入れする静的メソッドを生成
  static getLocal(key) {
    console.log('get from local');
    // localStorageからJSON取り出し
    const result = localStorage.getItem(key);
    // JSONをオブジェクトに変更
    // if (result !== "undefined") {
      return JSON.parse(result);
    // }
  }

  static setLocal(key, target) {
    console.log('set from local');
    // オブジェクトをJSONに変換
    const json = JSON.stringify(target);
    // JSONをlocalStorageに格納
    localStorage.setItem(key, json);
  }
}

// 名前の初期値を設定
const targetObj = DataSource.getLocal(KEY) || {};

// Proxyオブジェクトを生成し、セッターに処理を加える
// Reflectを使ってメソッドを呼び出す
const pxy = new Proxy(targetObj, {
  // セッターを準備
  set: function (target, prop, value, receiver) {
    // Reflectで汎用のsetを呼び出し 成功するとresultがtrue
    const result = Reflect.set(target, prop, value, receiver);
    // localStorageに格納を追加
    DataSource.setLocal(KEY, target);
    // returnでset結果を返す
    return result;
  }
})





console.log('init', pxy);
pxy.name = 'Tom';
console.log('change', pxy);
pxy.name = 'Bob';
console.log('change2', pxy);
