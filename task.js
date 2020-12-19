import { generateID } from './helpers/generateID.js';

export default class Task {
  constructor({ id = generateID(), name = '', isDone = false }) {
    this.id = id;
    this.name = name;
    this.isDone = isDone;
  }

  toggleIsDone() {
    this.isDone = !this.isDone;

    return this;
  }

  getHTML() {
    return `
      <li class="todo-list__item" data-task=${this.id}> 
        <input
          data-checkbox
          class="todo-form__checkbox"
          type="checkbox"
          title="${this.isDone ? "Отметить как не выполнено" : "Отметить как выполнено"}"
          ${this.isDone ? "checked" : ""}
        />

        <span class="todo-list__text">${this.name}</span> 

        <button
          data-delete-button
          class="button"
          title="Удалить задачу"
        >
          <i class="fas fa-trash-alt"></i>
        </button> 
      </li>
    `;
  }
}
