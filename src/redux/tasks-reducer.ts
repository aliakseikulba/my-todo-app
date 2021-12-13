import {TasksStateType} from '../App';
import {v1} from 'uuid';

type RemoveTaskAT = {
  type: 'REMOVE-TASK'
  taskID: string
  todoListID: string
}
type AddTaskAT = {
  type: 'ADD-TASK'
  taskTitle: string
  todoListID: string
}

type TasksAT = RemoveTaskAT | AddTaskAT

export const tasksReducer = (state: TasksStateType, action: TasksAT) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
      };
    }
    case 'ADD-TASK': {
      const newTask = {id: v1(), title: action.taskTitle, isDone: false};
      return {
        ...state,
        [action.todoListID]: [newTask, ...state[action.todoListID]]
      };
    }

    default:
      return state;
  }
};

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
  return {type: 'REMOVE-TASK', taskID, todoListID};
};

export const addTaskAC = (taskTitle: string, todoListID: string): AddTaskAT => {
  return {type: 'ADD-TASK', taskTitle, todoListID};
};