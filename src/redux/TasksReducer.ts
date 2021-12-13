import {TasksStateType} from '../App';
import {v1} from 'uuid';


type CreateNewTaskAT = ReturnType<typeof createNewTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type DeleteTasksAfterDeletingTodoListTypeAT = ReturnType<typeof deleteTasksAfterDeletingTodoListAC>
type GeneralActionType = AddTaskAT
  | RemoveTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT
  | CreateNewTaskAT
  | DeleteTasksAfterDeletingTodoListTypeAT

export const TasksReducer = (state: TasksStateType, action: GeneralActionType) => {

  switch (action.type) {

    case 'CREATE-NEW-TASK': {
      const stateCopy = {...state};
      stateCopy[action.payload.id] = [];
      return stateCopy;
    }
    case 'ADD-TASK':
      const stateCopy = {...state};
      const newTask = {id: v1(), title: action.payload.title, isDone: false};
      const tasksToAdding = stateCopy[action.payload.todoListID];
      const updatedTasks = [newTask, ...tasksToAdding];
      stateCopy[action.payload.todoListID] = updatedTasks;
      return stateCopy;
    case 'REMOVE-TASK': {
      const stateCopy = {...state};
      const tasksToRemove = state[action.payload.todoListID];
      stateCopy[action.payload.todoListID] = tasksToRemove.filter(t => t.id !== action.payload.taskID);
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = {...state};
      const tasksToChange = stateCopy[action.payload.todoListID];
      const taskToChange = tasksToChange.find(t => t.id === action.payload.taskID);
      if (taskToChange) {
        taskToChange.isDone = action.payload.value;
      }
      return stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.taskID ? {...t, title: action.payload.title} : t)}
    }
    case 'DELETE-TASKS': {
      delete state[action.payload.id];
      return state;
    }
    default:
      return state;
  }
};


export const createNewTaskAC = (todoListID: string) => {
  return {
    type: 'CREATE-NEW-TASK',
    payload: {
      id: todoListID
    }
  } as const;
};
export const addTaskAC = (taskTitle: string, todoListID: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title: taskTitle,
      todoListID: todoListID
    }
  } as const;
};
export const removeTaskAC = (taskID: string, todoListID: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      taskID,
      todoListID
    }
  } as const;
};
export const changeTaskStatusAC = (taskID: string, value: boolean, todoListID: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      taskID,
      value,
      todoListID
    }
  } as const;
};
export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      taskID,
      title: newTitle,
      todoListID
    }
  } as const;
};

export const deleteTasksAfterDeletingTodoListAC = (todoListID: string) => {
  return {
    type: 'DELETE-TASKS',
    payload: {
      id: todoListID
    }
  } as const;
};