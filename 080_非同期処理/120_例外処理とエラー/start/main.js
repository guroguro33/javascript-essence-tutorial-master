async function fetchUsers() {
  const response = await fetch('users.json');
  if (response.ok) {
    const json = await response.json();
    if (!json.length) {
      throw new NoDataError('no data found');
    }
    return json;
  }
}

// カスタムエラーを作成
class NoDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoDataError';
  }
}

async function init() {
  try {
    const json = await fetchUsers();
    for(const user of json) {
      console.log(`I'm ${user.name}, ${user.age} years old`)
    }
  } catch (e) {
    // カスタムエラーを使ってハンドリングできる
    if (e instanceof NoDataError) {
      console.error(e);
    } else {
      console.error('Oops, something went wrong');
    }
  } finally {
    console.log('bye');
  }
}
init();