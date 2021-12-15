import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST'
  todoListID: string
}
export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  todoListID: string
  title: string
}
export type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  todoListID: string
  title: string
}
export type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  todoListID: string
  filter: FilterType
}
type TodoListsReducerAT = RemoveTodoListAT
  | AddTodoListAT
  | ChangeTodoListTitleAT
  | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: TodoListsReducerAT): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListID);

    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: action.todoListID,
        title: action.title,
        filter: 'all'
      };
      return [ newTodoList, ...todoLists];

    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);

    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);

    default:
      return todoLists;
  }
};

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
  return {type: 'REMOVE-TODOLIST', todoListID};
};

export const addTodoListAC = (title: string): AddTodoListAT => {
  return {type: 'ADD-TODOLIST', todoListID: v1(), title};
};

export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
  return {type: 'CHANGE-TODOLIST-TITLE', todoListID, title};
};

export const changeTodoListFilterAC = (todoListID: string, filter: FilterType): ChangeTodoListFilterAT => {
  return {type: 'CHANGE-TODOLIST-FILTER', todoListID, filter};
};