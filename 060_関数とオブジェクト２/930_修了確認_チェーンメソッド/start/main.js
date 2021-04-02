/**
 * 問題：
 * 電卓の入力と同じような挙動をするチェーンメソッド
 * を作成してみましょう。
 * 
 * 例えば、次のように使用し、結果が表示
 * されるようにします。
 * 
 * 
 * 例１）
 * const calc = new Calculator();
 * 
 * calc.set(10)
 * .minus()
 * .set(3) -> '7'を出力(10 - 3)
 * 
 * 例２）
 * const calc = new Calculator();
 * 
 * calc.set(10)
 * 	.minus()
 * 	.set(3) -> '7'を出力
 * 	.multiply()
 * 	.set(6) -> '42'を出力（10 - 3) * 6
 */

class Calculator {
  constructor() {
    this.result = null;
    this.calc = '';
  }

  set(val) {
    switch (this.calc) {
      case 'plus':
        this.result = this.result + val;
        console.log(this.result);
        break;
      case 'minus':
        this.result = this.result - val;
        console.log(this.result);
        break;
      case 'multiply':
        this.result = this.result * val;
        console.log(this.result);
        break;
      case 'divide':
        this.result = this.result / val;
        console.log(this.result);
        break;
      default:
        this.result = val;
        break;
    }
    return this;
  }
  plus() {
    this.calc = 'plus';
    return this;
  }
  minus() {
    this.calc = 'minus';
    return this;
  }
  multiply() {
    this.calc = 'multiply';
    return this;
  }
  divide() {
    this.calc = 'divide';
    return this;
  }
}

const calc = new Calculator();

calc.set(10)
	.minus()
	.set(3)
	.multiply()
	.set(6)
	.divide()
	.set(2)
	.plus()
	.set(2)
