import {FilterType, TodoListType} from '../App';


type AddTodoListAT = ReturnType<typeof addTodoListAC>
type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
type GeneralActionType = AddTodoListAT | RemoveTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const TodoListReducer = (state: Array<TodoListType>, action: GeneralActionType) => {
  switch (action.type) {

    case 'ADD-TODOLIST': {
      const newTodoList: TodoListType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all'
      };
      return [newTodoList, ...state];
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = [...state];
      return stateCopy.filter(tl => tl.id !== action.payload.id);
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const stateCopy = [...state];
      const rightTodolist = stateCopy.find(tl => tl.id === action.payload.id);
      if (rightTodolist) {
        rightTodolist.title = action.payload.title;
      }
      return stateCopy;
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const stateCopy = [...state];
      const todoListToFilter = stateCopy.find(tl => tl.id === action.payload.id);
      if (todoListToFilter) {
        todoListToFilter.filter = action.payload.value;
      }
      return stateCopy;
    }
    default:
      return state;
  }
};

export const addTodoListAC = (todoListTitle: string, todoListID: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title: todoListTitle,
      id: todoListID
    }
  } as const;
};
export const removeTodoListAC = (todoListID: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    payload: {
      id: todoListID
    }
  } as const;
};
export const changeTodoListTitleAC = (todoListID: string, newTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id: todoListID,
      title: newTitle
    }
  } as const;
};
export const changeTodoListFilterAC = (filterValue: FilterType, todoListID: string) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      value: filterValue,
      id: todoListID
    }
  } as const;
};