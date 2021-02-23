a();
function a() {
  let c = 1;

  console.log(c);
  
  d();
  function d() {
    console.log('d is called');
  }
  console.log('a is called');
}

console.log(b);
const b = 0;