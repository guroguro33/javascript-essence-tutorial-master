/**
 * 問題：
 * 以下の操作を行った際にコンソールで表示される
 * 値はどうなるでしょうか？結果を考えてみてください。
 */
let val = 0;
let val2 = val;
val2 = 1;

// console.log(val); // 問題１
// 0 正解

let obj = {
    prop1: 10
}
const obj2 = obj;
obj2.prop1 = 9;

// console.log(obj); // 問題２
// 9 不正解
// { prop1: 9}

function fn1(arg) {
    arg.prop2 = 8;
    return arg;
}
let obj3 = fn1(obj2);

// console.log(obj); // 問題３
// {prop1:10, prop2:8} 不正解
// {prop1:9, prop2:8}

function fn2(arg) {
    arg = {};
    return arg;
}
const obj4 = fn2(obj); // 問題４

console.log(obj); // 問題４
// {} 不正解 参照先が新しいオブジェクトになり、objは何も影響が出ない
// {prop1: 9, prop2: 8}
