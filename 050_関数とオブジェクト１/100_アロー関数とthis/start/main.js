window.name = 'John';

const person = {
  name: 'Tom',
  say() {
    console.log('sayプロパティの記述');
  },
  hello: () => {
    console.log('Hello ' + this.name);
    const a = () => console.log('Bye ' + this.name);
    a();
  }
}

person.hello();
// person.say();

