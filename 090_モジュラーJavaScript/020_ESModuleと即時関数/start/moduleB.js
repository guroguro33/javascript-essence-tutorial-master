import { publicFn as fn, publicVal as val } from './moduleA.js';
fn();
fn();
// オブジェクトにするとval.propとして呼び出せるし、++可能
console.log(val.prop++)
console.log(val.prop++)
fn();
console.log(val.prop++)
console.log(val.prop++)