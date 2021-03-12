function hello(name) {
  console.log('hello ' + name);
}

function bye() {
  console.log('bye');
}

//cbがコールバック関数
function fn(cb) {
  cb('Tom');
}

fn(hello);
fn(bye);

// オブジェクトであるため、引数にも入れられる
fn(function () {
  console.log('callBack');
})

setTimeout(hello, 3000);