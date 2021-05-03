const wm = new WeakMap();
export class Person {
    constructor(name, age) {
        // this._name = name;
      wm.set(this, {
        name,
        age
      });
      console.log(wm);
    }

    hello() {
        console.log(`hello ${wm.get(this).name}`);
    }
}
