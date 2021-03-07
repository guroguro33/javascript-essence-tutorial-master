function hello(name = 'Bob') { // ES6から初期値OK
  // name = name || 'Bob'; // if文使わなくてもいい
  console.log('Hello,' + name);
}

hello();

let name = 'Bob';
name && hello(name)