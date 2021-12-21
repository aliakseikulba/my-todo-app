import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todoLists-reducer';

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasksReducer,
  todoListsReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;