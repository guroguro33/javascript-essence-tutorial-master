const person = {
    name: 'Tom',
    hello: function() {
      console.log('hello ' + this.name);
    }
}

person.hello();