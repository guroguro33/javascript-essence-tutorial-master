const handler = {
  get(target, prop, receiver) {
    const result = Reflect.get(target, prop, receiver);
    console.log('%c[reactive:get]', 'background: green;color: white;', prop, result)
    return result;
  },
  set(target, prop, value, receiver) {
    const result = Reflect.set(target, prop, value, receiver);
    console.log('%c[reactive:set]', 'background: red;color: white;', prop, result)
    trigger();
    return result;
  }
}

function reactive(target) {
  return new Proxy(target, handler);
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
}
function trigger() {
  activeEffect();
}
export { effect, trigger,reactive };