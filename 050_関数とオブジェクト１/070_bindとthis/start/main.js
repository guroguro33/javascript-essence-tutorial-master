window.name = 'John';

const person = {
    name: 'Tom',
    hello: function() {
        console.log('Hello ' + this.name);
    }
}
person.hello();

// bind(person)で、helloの実行元をpersonとしている
const helloTom = person.hello.bind(person);

function fn(ref) {
    ref();
}

fn(helloTom);

// bindの使用例
function a() {
  console.log('hello ' + this.name);
}

const b = a.bind({ name: 'Tim' });

b();

function c(name) {
  console.log('bye ' + name);
}

// 第１引数はthisの値、第２引数は関数cの引数を束縛できる
const d = c.bind(null, 'Taro');

// 引数Bobを指定しても、束縛されたTaroが実行される
d('Bob');