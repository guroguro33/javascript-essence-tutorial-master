// function* gen() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// const it = gen();
// console.log(it);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

function genIterator1(max = 10) {
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

// genIterator1と同等の記述がyieldで簡易に表記できる
function* genIterator(max = 10) {
  let i = 0;

  while (i < max) {
    yield i++;
  }
  return;
}

const it = genIterator(10);

let a = it.next();
while (!a.done) {
  console.log(a.value);
  a = it.next();
}

// Symbolとジェネレータを使った記述
const obj = {
  [Symbol.iterator]: genIterator
}

// 別の書き方
const obj2 = {
  [Symbol.iterator]: function* genIterator(max = 10) {
    let i = 0;

    while (i < max) {
      yield i++;
    }
    return;
  }
}

// さらに短縮
const obj3 = {
  *[Symbol.iterator](max = 10) {
    let i = 0;

    while (i < max) {
      yield i++;
    }
    return;
  }
}

for (let i of obj) {
  console.log(i);
}