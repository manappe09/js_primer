const program = require("commander");
const fs = require("fs");
const md2html = require('./md2html');

program.option("--gfm", "GFMを有効にする");
// commdanderによってコマンドライン引数をパースする
program.parse(process.argv);

// オプションを取得
const options = program.opts();

// コマンドラインで指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
  gfm: options.gfm ?? false,
}

// ファイルパスをprogramオブジェクトから取り出す
const filePath = program.args[0];

fs.readFile(filePath, { encoding: "utf8" }, (error, file) => {
  if (error) {
    console.log(error.message);
    process.exit(1);
    return;
  }

  const html = md2html(file, cliOptions);
  console.log(html);
});