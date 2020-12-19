import { generateID } from './helpers/generateID.js';
import TasksList from "./tasks-list.js";

new TasksList({
  rootEl: document.querySelector("[data-tasks-list]"),
  tasks: [
    {
      id: generateID(),
      name: "Learn Java Script",
      isDone: false
    }
  ]
});
