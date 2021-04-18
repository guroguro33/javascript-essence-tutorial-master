function sleep(val) {
  return new Promise(function(resolve,reject) {
    setTimeout(function() {
      console.log(val++);
      reject(val);
    }, val * 500);
  });
}

// 並列処理する場合はPromise.all(繰り返し処理するもの)を使う
allの中にはpromiseのインスタンスで反復可能なものを入れる
Promise.all([sleep(2), sleep(3), sleep(4)])
  .then(function (data) {
    console.log(data); // 2, 3, 4 のあとに [3, 4, 5]と出力
  })

// Promise.raceを使うと、配列の最初のresolveが帰った直後にthenメソッドを実行する 
Promise.race([sleep(2), sleep(3), sleep(4)])
  .then(function (data) {
    console.log(data); // 2, 3, 3, 4と出力
  })

// Promise.allSettledを使うと、rejectの場合にもcatchにいかず、thenが実行される
// 返ってくる引数もオブジェクトであり、resolveだとstatusはfulfilled、rejectだとstatusはrejected
Promise.allSettled([sleep(2), sleep(3), sleep(4)])
  .then(function (data) {
    console.log(data); // 2, 3, 4 のあとにオブジェクトが出力
  }).catch(function (e) {
    console.error(data); // allSettledの場合はrejectでもcatchされない
  })

// sleep(0).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// })
