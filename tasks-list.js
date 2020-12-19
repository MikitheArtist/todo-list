import Task from "./task.js";

export default class TasksList {
  constructor({ rootEl, tasks = [] }) {
    this.rootEl = rootEl;
    this.listEl = rootEl.querySelector("[data-list]");
    this.tasks = tasks.map((task) => new Task(task));

    this.init();
  }

  init() {
    this.bindDomEvents();
    this.render();
  }

  deleteTask(taskID) {
    this.tasks = this.tasks.filter(({ id }) => id !== taskID);

    this.render();
  }

  toggleTaskIsDone(taskID) {
    this.tasks = this.tasks.map((task) => {
      return task.id === taskID ? task.toggleIsDone() : task;
    });

    this.render();
  }

  addTask(taskData) {
    this.tasks.push(new Task(taskData));

    this.render();
  }

  bindDomEvents() {
    const formEl = this.rootEl.querySelector("[data-task-form]");

    formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = formEl.querySelector("[name=name]");

      if (input.value) {
        this.addTask({
          name: input.value,
        });

        input.value = "";
      }
    });

    this.rootEl.addEventListener("click", (event) => {
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

  render() {
    this.listEl.innerHTML = this.tasks.map((task) => task.getHTML()).join('');
  }
}
