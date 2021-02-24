import { generateID } from '../../../helpers';
import { Task } from './task';

export class TasksList {
  constructor({ id = generateID(), name, tasks = [], onChange = () => {} }) {
    this.id = id;
    this.name = name;
    this.tasks = tasks.map((task) => new Task(task));
    this.onChange = onChange;

    this.init();
  }

  init() {
    this.bindDomEvents();
  }

  deleteTask(taskID) {
    this.tasks = this.tasks.filter(({ id }) => id !== taskID);

    this.onChange();
  }

  toggleTaskIsDone(taskID) {
    this.tasks = this.tasks.map((task) => {
      return task.id === taskID ? task.toggleIsDone() : task;
    });

    this.onChange();
  }

  addTask(taskData) {
    this.tasks.push(new Task(taskData));

    this.onChange();
  }

  bindDomEvents() {
    document.addEventListener("submit", (event) => {
      event.preventDefault();

      const listID = event.target.closest("[data-tasks-list]")?.dataset?.tasksList;
      console.log(listID);
      if (listID === this.id) {
        const input = event.target.querySelector("[name=name]");

        if (input?.value) {
          this.addTask({
            name: input.value,
          });

          input.value = "";
        }
      }
    });

    document.addEventListener("click", (event) => {
      const deleteButtonEl = event.target.closest("[data-delete-button]");
      const checkboxEl = event.target.closest("[data-checkbox]");

      if (deleteButtonEl) {
        this.deleteTask(deleteButtonEl.closest("[data-task]").dataset.task);
      } else if (checkboxEl) {
        event.preventDefault();

        this.toggleTaskIsDone(checkboxEl.closest("[data-task]").dataset.task);
      }
    });
  }

  getHTML() {
    return `
      <div data-tasks-list=${this.id} class="tasks-list">
        <div class="tasks-list-header">
          <h2 class="tasks-list-header__title">${this.name}</h2>
          <button
            data-delete-btn
            class="btn btn-dark"
            title="Удалить cписок"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
  
        <form data-task-form class="tasks-list-form">
          <input
            autocomplete="off"
            class="tasks-list-form__input"
            name="name"
            placeholder="Добавить задачу..."
          />
  
          <button class="btn btn-info" title="Добавить задачу">
            <i class="fas fa-plus"></i>
          </button>
        </form>
  
         <ul data-list class="list-group">
           ${this.tasks.map((task) => task.getHTML()).join('')}
         </ul>
      </div>
    `;
  }
}
