function sleep(val) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      console.log(val++);
      resolve(val);
    }, 1000);
  });
}

async function init() { // awaitを使う関数は必ずasyncを記述
  let val = await sleep(0); // resolveのvalが返却される
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  throw new Error(); // throwでcatchできる
  return val;
}

// initで実行されるが、asyncはpromiseを返却するので、thenが使える
init().then(function (val) { // return valのvalが返却される
  console.log('hello:' + val);
}).catch(function (e) {
  console.error(e);
});

// sleep(0).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// })
