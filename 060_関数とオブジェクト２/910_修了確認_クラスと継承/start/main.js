/**
 * 問題：
 * ログインの制御を行うloginController
 * という名前の関数が存在します。
 * この関数はuserインスタンスを渡すと
 * 
 * ログイン処理（login）
 * ->ユーザー権限チェック（checkRoll）
 * ->適切なページへのリダイレクト（redirect）
 * 
 * を内部で行います。
 * 
 * 以下の呼び出し方をした場合に該当のメッセージが
 * コンソールに出るように実装してみてください。
 * 
 **************************************** 
 * １．一般ユーザーがログインした時。
 * loginController(new User('Bob'));
 * 
 * ログイン成功した場合：
 * User: Bob
 * you have normal roll
 * redirect : /
 * login success
 * 
 * ログイン失敗した場合：
 * User: Bob
 * you have normal roll
 * login failed <- checkRollで失敗した場合
 * 
 ****************************************
 * ２．管理者（AdminUser）でログインした場合
 * loginController(new AdminUser('Bob'));
 * 
 * ログイン成功した場合：
 * User: Bob
 * you have admin roll
 * redirect : /admin
 * login success
 * 
 * ログイン失敗した場合：
 * User: Bob
 * login failed <- loginで失敗した場合
 */

function loginController(user) {
  if (user.login()
    && user.checkRoll()
    && user.redirect()) {
    console.log('login success');
  } else {
    console.log('login failed');
  }
}

class Person{
  // ログイン
  login() {
    if (this.name === 'Bob') {
      console.log('User: ' + this.name);
      return true;
    } else {
      return false;
    }
  }

  // ユーザー権限チェック
  checkRoll() {
    if (this.roll === 'normal') {
      console.log('you have normal roll');
      return true;

    } else if (this.roll === 'admin') {
      console.log('you have admin roll');
      return true;

    } else {
      return false;
    }
  }

  // リダイレクト
  redirect() {
    if (this.roll === 'normal') {
      console.log('redirect : /');
      return true;

    } else if (this.roll === 'admin') {
      console.log('redirect : /admin');
      return true;
    } else {
      return false;
    }
  }
}

class User extends Person{
  constructor(_name) {
    super();
    this.name = _name;
    this.roll = 'normal';
  }  
}

class AdminUser extends Person{
  constructor(_name) {
    super();
    this.name = _name;
    this.roll = 'admin';
  }
}

const bob1 = new User('Bob');
console.log(bob1);

const bob2 = new AdminUser('Bob');
console.log(bob2);

loginController(bob1);
loginController(bob2);