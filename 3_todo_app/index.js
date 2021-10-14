import { App } from './src/App.js';

const app = new App();

console.log('index.js opened!');

app.mount();

// イベントリスナーを登録
// event.addEventListener('test-event', () => console.log('one!'));
// event.addEventListener('test-event', () => console.log('two!'));

// イベントをディスパッチする
// event.emit('test-event');