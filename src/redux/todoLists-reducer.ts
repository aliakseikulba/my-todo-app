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
  id: string
  title: string
}
export type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterType
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListID);

    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: action.todoListID,
        title: action.title,
        filter: 'all'
      };
      return [...todoLists, newTodoList];

    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);

    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);

    default:
      return todoLists;
  }
};

export const removeTodoListAC = (todolistID: string): RemoveTodoListAT => {
  return {type: 'REMOVE-TODOLIST', todoListID: todolistID};
};

export const addTodoListAC = (todolistTitle: string): AddTodoListAT => {
  return {type: 'ADD-TODOLIST', todoListID: v1(), title: todolistTitle};
};

export const changeTodoListTitleAC = (todolistTitle: string, todolistID: string): ChangeTodoListTitleAT => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: todolistTitle,};
};

export const changeTodoListFilterAC = (todolistID: string, todolistFilter: FilterType): ChangeTodoListFilterAT => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID, filter: todolistFilter};
};