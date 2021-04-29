// classの中は自動的にstrictモードがONになる
class C {
  constructor() {
    function fn() {
      console.log(this);
    }
    fn();
  }

  method() {
    function fn() {
      console.log(this);
    }
    fn();
  }
}

const c = new C();
c.method();
