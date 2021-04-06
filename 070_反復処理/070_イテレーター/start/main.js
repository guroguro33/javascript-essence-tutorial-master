function genIterator(max = 10) {
  let i = 0;

  return {
    next: function () {
      if (i >= max) {
        return {
          done: true
        }
      } else {
        return {
          done: false,
          value: i++
        }
      }
    }
  }
}

const it = genIterator(100);

// while文でのループ
let a = it.next();
while (!a.done) {
  // console.log(a.value);
  a = it.next();
}

// Symbol
const obj = {
  [Symbol.iterator]: genIterator.bind(null, 10)
}
console.log(obj)

for (const i of obj) {
  console.log(i);
}

const s = new Set(obj);
console.log(s)
