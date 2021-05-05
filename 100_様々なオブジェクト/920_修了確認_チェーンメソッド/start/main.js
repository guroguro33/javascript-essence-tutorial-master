/**
 * 問題：
 * 反復操作可能なオブジェクトIteratableObject
 * を作成してみましょう。
 * Arrayと同様に以下のメソッドが使用可能とします。
 * 
 * set(key, value)  *1
 * forEach
 * map
 * filter
 * 
 * *1:setはチェーンメソッドとしてつなげられるように実装してみてください。
 * 
 * また、for...ofを使用した際にはMapと同じ挙動を取るものとします。
 * 
 */
class IteratableObject {
	constructor(obj) {
		for(let prop in obj) {
			this[prop] = obj[prop];
		}
	}

	print(label = '') {
		console.log(`%c ${label}`, 'color: blue; font-weight: 600;', this);
		return this;
  }
  
  set(key, val) {
    const result = new IteratableObject(this);
    result[key] = val;
    return result;
  }

  forEach(callback) {
    for (let [k, v] of this) {
      callback(v, k, this);
    }
  }

  map(callback) {
    for (let key in this) {
      callback(this[key], key, this);
    }
    return this;
  }

}

function prefix(v, i, obj) {
	return 'prefix-' + v;
}

const original = new IteratableObject({
	key1: 'value1',
	key2: 'value2',
	key3: 'value3',
});

const result = original
	.map(prefix)
	.set('key4', 'value4')
  .set('key5', 'value5')
  .forEach(function (v) {
    console.log(v);
  })
	// .filter(function (val, key) {
	// 	return key === 'key4';
	// });

console.log('%coriginal', 'color: blue; font-weight: bold;', original);
console.log('%cresult', 'color: red; font-weight: bold;', result);
/**
 * 期待する出力結果
 * original 
 * {key1: "value1", key2: "value2", key3: "value3"}
 * 
 * result 
 * {key4: "value4"}
 */
