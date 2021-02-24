import { generateID } from '../../../../helpers';

export class Task {
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
      <li class="list-group-item d-flex justify-content-between align-items-center" data-task=${this.id}> 
        <input
          data-checkbox
          class="task__checkbox"
          type="checkbox"
          title="${this.isDone ? "Отметить как не выполнено" : "Отметить как выполнено"}"
          ${this.isDone ? "checked" : ""}
        />

        <span class="task__name">${this.name}</span> 

        <button
          data-delete-button
          class="btn btn-dark"
          title="Удалить задачу"
        >
          <i class="fas fa-trash-alt"></i>
        </button> 
      </li>
    `;
  }
}
