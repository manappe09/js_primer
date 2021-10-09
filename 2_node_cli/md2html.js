// オプションを元にmarkdown文字列をHTMLに変換して返す処理のモジュール
const marked = require("marked");

module.exports = (markdown, cliOptions) => {
  return marked(markdown, {
    // オプションの値を上書きする
    gfm: cliOptions.gfm,
  });
}