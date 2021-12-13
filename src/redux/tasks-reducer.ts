import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todoLists-reducer';

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
type ChangeTasksStatusAT = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  status: boolean
  todoListID: string
}
type ChangeTaskTitleAT = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  todoListID: string
}

type TasksAT = RemoveTaskAT | AddTaskAT | ChangeTasksStatusAT
  | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

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
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID]
          .map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)
      };
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID]
          .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
      };
    }

    case 'ADD-TODOLIST': {
      return {...state, [action.todoListID]: []}
    }

    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.todoListID];
      return stateCopy;
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

export const changeTaskStatusAC = (taskID: string, status: boolean, todoListID: string): ChangeTasksStatusAT => {
  return {type: 'CHANGE-TASK-STATUS', taskID, status, todoListID};
};

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID};
};