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