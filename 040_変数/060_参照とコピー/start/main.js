let c = {
  prop: 'hello'
}
let d = c;
d = {};
d.prop = 'bye';
console.log(c, d);