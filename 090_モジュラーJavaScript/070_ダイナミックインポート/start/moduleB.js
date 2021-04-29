// import defaultVal, { publicVal, publicFn } from './moduleA.js';

// publicFn();

// console.log(defaultVal);

import('./moduleA.js').then(function (modules) {
  // importするとpromiseで返ってくるため、thenでつなぐ
  // 引数modulesの中にexportされたプロパティやメソッドが入っている
  console.log(modules);
  modules.publicFn();
})

// promiseで返ってくるため、async-await記述できる
async function fn() {
  const modules = await import('./moduleA.js');
  modules.publicFn();
};
fn();