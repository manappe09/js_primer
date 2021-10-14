import { EventEmitter } from "../EventEmmiter.js";

export class TodoListModel extends EventEmitter {
  /**
   * 
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空）
   */
  constructor(items = []) {
    super()
    this.items = items;
  }

  /**
   * Todoアイテムの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.items.length;
  }

  /**
   * 表示できるTodoアイテムの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * Todoリストの状態が更新された時に呼び出すイベントリスナーを登録する
   * @param {Funtfion} listener 
   */
  onChange(listener) {
    this.addEventListener('change', listener)
  }

  /**
   * 状態が変更された時に呼ぶ。登録済みのイベントリスナーを呼び出す。
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem 
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのアイテムのcompletedを更新する
   * @param {{id: number, completed: boolean}}
   */
  updateTodo({ id, completed }) {
    // idが一致するtodoItemを見つけ、あるなら完了にする
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのtodoItemを削除する
   * @param {{id: number}} 
   */
  deleteTodo({id}) {
    // idに一致しないtodoItemを残すことで、指定したidのtodoItemを削除する
    this.items = this.items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}