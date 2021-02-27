function a() {
  console.log('called');
};

a();

// これも即時関数
(a)();

let c = (function () {
  console.log('called');

  let privateVal = 0;
  let publicVal = 10;

  function privateFn() {
    console.log('privateFn is called');
  }
  function publicFn() {
    console.log('publicFn is called' + publicVal++);
  }

  return {
    // publicVal: publicVal, 同名の場合、下記のように省略可能
    publicVal,
    // publicFn: publicFn これも省略可能
    publicFn
  };

})();
console.log(c.publicVal);
// console.log(c.privateVal); 呼べない
c.publicFn();
c.publicFn();
c.publicFn();
// c.privateFn(); 呼べない
// console.log(c);

// letで定義するとカッコ不要
let b = function () {
  console.log('called');
}();