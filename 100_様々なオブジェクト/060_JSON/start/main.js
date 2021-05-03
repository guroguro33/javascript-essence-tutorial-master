const obj = {a: 0, b: 1, c: 2};

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
const json2 = JSON.stringify(obj, ["a", "b"]);
console.log(json1);
console.log(json2);

// jsonをオブジェクトに変換
const obj1 = JSON.parse(json1);
console.log(obj1);

const obj2 = JSON.parse(json2);
console.log(obj2);