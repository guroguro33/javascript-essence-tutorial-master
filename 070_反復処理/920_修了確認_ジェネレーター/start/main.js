/**
 * 問題：
 * 引数で与えた範囲の値をステップ毎に返却する
 * genStepというジェネレーター関数を作成しましょう。
 * 
 * - genStepの要件
 * 引数にmin, max, stepを取ります。
 * min：下限値
 * max：上限値
 * step：ステップ
 * 
 * 以下のように実行した場合には
 * const it = genStep({min: 4, max: 10, step: 2});
 * 
 * for(let value of it) {
 *   console.log(value); -> 4, 6, 8, 10
 * }
 * 
 * の値が順番にコンソールに表示されます。
 */

// = {}で引数が空の時でもエラーにならない
function* genStep({ min = 0, max = 100, step = 1 } = {}) {
  
  for (let val = min; val <= max; val += step){
    yield val;
  }
}


// const it = genStep({ min: 4, max: 10, step: 2 });
const it = genStep({ min: 4, max: 10});
console.log(it);

for(let value of it) {
   console.log(value);
 }