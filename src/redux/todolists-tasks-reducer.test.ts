import {TasksStateType, TodoListType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {addTodoListAC, todoListsReducer} from './todoLists-reducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = addTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todoListID);
  expect(idFromTodoLists).toBe(action.todoListID);
});
