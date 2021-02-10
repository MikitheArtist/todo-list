import { generateID } from '../../assets/scripts/helpers';
import { Task } from '../task/task';

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
      <div data-tasks-list=${this.id} class="todo">
        <div class="header">
          <h2 class="todo__title">${this.name}</h2>
          <button
            data-delete-btn
            class="button"
            title="Удалить cписок"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
  
        <form data-task-form class="todo-form todo__form">
          <input
            autocomplete="off"
            class="todo-form__input"
            name="name"
            placeholder="Добавить задачу..."
          />
  
          <button class="button" title="Добавить задачу">
            <i class="fas fa-plus"></i>
          </button>
        </form>
  
         <ul data-list class="todo-list todo__list">
           ${this.tasks.map((task) => task.getHTML()).join('')}
         </ul>
      </div>
    `;
  }
}
