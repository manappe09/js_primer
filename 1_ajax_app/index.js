console.log("index.js: loaded");

// const userId = "js-primer-example";

// function fetchUserInfo(userId) {
//   fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
//     .then(response => {
//       console.log(response.status);
//       if(response.ok) {
//         return response.json().then(userInfo => {
//           // JSONパースされたオブジェクトが渡される
//           console.log(userInfo);
//           // タグ付きテンプレート
//           const view = escapeHTML`
//             <h4>${userInfo.name} (@${userInfo.login})</h4>
//             <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
//             <dl>
//               <dt>Location</dt>
//               <dd>${userInfo.location}</dd>
//               <dt>Repositories</dt>
//               <dd>${userInfo.public_repos}</dd>
//             </dl>
//           `;

//           const result = document.getElementById('result');
//           result.innerHTML = view;
//         });
//       } else {
//         throw new Error(response);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// リファクタリング① 肥大化したfetchUserInfo関数を分割する
// function fetchUserInfo(userId) {
//   fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
//     .then(response => {
//       console.log(response.status);
//       if(response.ok) {
//         return response.json().then(userInfo => {
//           // JSONパースされたオブジェクトが渡される
//           console.log(userInfo);

//           // HTMLの組み立て
//           const view = createView(userInfo);

//           // HTMLの挿入
//           displayView(view);
//         });
//       } else {
//         throw new Error(response);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }


// リファクタリング②　　fetchUserInfoではPromiseを返すようにし、main()で非同期処理の結果を扱えるようにする。
// function main() {
//   fetchUserInfo('js-primer-example')
//     .catch((error) => {
//       // Promiseチェーンの中で発生したエラーを受け取る
//       console.log(error.message);
//     });
// }
// function fetchUserInfo(userId) {
//   fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
//     .then(response => {
//       console.log(response.status);
//       if(response.ok) {
//         return response.json().then(userInfo => {
//           // JSONパースされたオブジェクトが渡される
//           console.log(userInfo);
//           // HTMLの組み立て
//           const view = createView(userInfo);
//           // HTMLの挿入
//           displayView(view);
//         });
//       } else {
//         return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
//       }
//     });
// }

// リファクタリング③ Promiseチェーンを使って処理を分割する
// function main() {
//   fetchUserInfo('js-primer-example')
//     // ここではjsonオブジェクトで解決されるPromiseオブジェクト
//     .then((userInfo) => createView(userInfo))
//     // ここではHTML文字列で解決されるPromiseオブジェクト
//     .then((view) => displayView(view))
//     // Promiseチェーンでエラーがあった場合はキャッチされる
//     .catch((error) => {
//       console.log(error.message);
//     });
// }

// リファクタリング④ Async Functionを使ってリファクタリングする
async function main() {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId);
    const view = await createView(userInfo);
    displayView(view);
  } catch (error) {
    console.log(error.message);
  }
}

function fetchUserInfo(userId) {
  return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
      if(response.ok) {
        // jsonオブジェクトで解決されたPromiseを返す
        return response.json();
      } else {
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      }
    });
}

function createView(userInfo) {
  // タグ付きテンプレート
  return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
      <dt>Location</dt>
      <dd>${userInfo.location}</dd>
      <dt>Repositories</dt>
      <dd>${userInfo.public_repos}</dd>
    </dl>
  `;
}

function displayView(view) {
  const result = document.getElementById('result');
  result.innerHTML = view;
}

function getUserId() {
  return document.getElementById('userId').value;
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}