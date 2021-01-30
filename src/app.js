import { TasksBoard } from "./scripts/tasks-board";
import { ModalsProvider } from 'ui-modal';
 

const tasksBoard = new TasksBoard({
  rootEl: document.querySelector("[data-tasks-board]"),
  lists: [
    {
      name: 'My first tasks list',
      tasks: [
        {
          name: "Learn Java Script",
          isDone: false
        }
      ]
    }
  ]
});

export const modalProvider = new ModalsProvider ({

});

// setInterval(() => {
//   tasksBoard.addList({ name: new Date().toLocaleTimeString()});
// }, 2000); 
