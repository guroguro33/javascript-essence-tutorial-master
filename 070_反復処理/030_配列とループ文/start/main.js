const arry = [1, 2, 3, 4, 5];

for (let i = 0; i < arry.length; i++){
  console.log(arry[i]);
}

let v, i = 0;
// 配列に値がある場合はwhileの条件がtrucyになるため、実行される
while (v = arry[i++]) {
  console.log(v);
}