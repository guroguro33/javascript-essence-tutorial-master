new Promise(function (resolve, reject) {
  console.log('promise');
  // resolve("hello");
  setTimeout(function () {
    reject('bye');
  },1000)
}).then(function (data) {
  console.log('then: ' + data); 
  // throw new Error(); // catchメソッドに移行できる
  return data; // 次のthenに変数を渡す
}).then(function (data) {
  console.log('then: ' + data);
  return data; // finallyに変数は渡せない
}).catch(function (data) {
  console.log('catch: ' + data);
}).finally(function(data) {
  console.log('finally');
})

console.log('global end');