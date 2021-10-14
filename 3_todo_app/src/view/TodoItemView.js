import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * 
   * @param {TodoItemModel} todoItem 
   * @param {function({id:string, completed:boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, {onUpdateTodo, onDeleteTodo}) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox"  class="checkbox" checked>
        <s>${todoItem.title}</s>
        <button class="delete">x</button>
      </li>`
      : element`<li><input type="checkbox" class="checkbox">
        ${todoItem.title}
        <button class="delete">x</button>
      </li>`;
    // チェックボックスがトグルした時のイベントをリスナーに登録
    const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
    inputCheckboxElement.addEventListener('change', () => {
      // 指定したtodoItemの完了状態を反転させる
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    // 
    const deleteButtonElement = todoItemElement.querySelector('.delete');
    deleteButtonElement.addEventListener('click', () => {
      onDeleteTodo({
        id: todoItem.id,
      })
    });
    // 作成したTodoアイテムのHTMl要素を返す
    return todoItemElement;
  }
}