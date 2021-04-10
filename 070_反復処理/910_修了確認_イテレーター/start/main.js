/**
 * 問題：
 * 引数で与えた範囲の値をステップ毎に返却する
 * genStepというイテレーターを生成する関数を作成しましょう。
 * 
 * - genStepの要件
 * 引数にmin, max, stepを取ります。
 * min：下限値
 * max：上限値
 * step：ステップ
 * 
 * 以下のように実行した場合には
 * const it = genStep(4, 10, 2);
 * let a = it.next();
 * 
 * while(!a.done) {
 *  console.log(a.value); -> 4, 6, 8, 10
 *  a = it.next();
 * }
 * 
 * の値が順番にコンソールに表示されます。
 */

function genStep(min = 0, max = 20, step = 1 ) {
  let val = 0;

  return {
    next: function() {
      if (val >= max) {
        return {
          done: true
        }
      } else if(val === 0) {
        return {
          done: false,
          value: val = min
        }
      } else {
        return {
          done: false,
          value: val += step
        }
      }
    }
  }
}


 
const it = genStep(4, 10, 2);
let a = it.next();

while(!a.done) {
  console.log(a.value);
  a = it.next();
}
