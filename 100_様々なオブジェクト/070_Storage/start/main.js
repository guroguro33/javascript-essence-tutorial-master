const obj = { a: 10 };
const json = JSON.stringify(obj);
localStorage.setItem('key', json);
const result = localStorage.getItem('key');
const json2 = JSON.parse(result);
console.log(json2);