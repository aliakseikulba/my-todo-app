import React, {useCallback} from 'react';
import {FilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {addTaskAC} from '../redux/tasks-reducer';
import Task from './Task';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  todoListID: string
  title: string
  filter: FilterType
  changeFilter: (filterValue: FilterType, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

const Todolist = React.memo((props: TodolistPropsType) => {
  const {
    title,
    changeFilter,
    filter,
    todoListID,
    removeTodoList,
    changeTodoListTitle
  } = props;

  const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[todoListID]);
  const dispatch = useDispatch();

  const removeTodo = () => {
    removeTodoList(todoListID);
  };
  const changeTodoTitle = useCallback((newTitle: string) => {
    changeTodoListTitle(todoListID, newTitle);
  }, [changeTodoListTitle, todoListID]);

  let tasksForTodolist = tasks;
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  const addTask = useCallback((title: string) => dispatch(addTaskAC(title, todoListID)), [dispatch, todoListID]);

  const setAll = useCallback(() => changeFilter('all', todoListID), [changeFilter, todoListID]);
  const setActive = useCallback(() => changeFilter('active', todoListID), [changeFilter, todoListID]);
  const setCompleted = useCallback(() => changeFilter('completed', todoListID), [changeFilter, todoListID]);


  return (
    <div className={'todoList'}>
      <div className={'todoListHead'}>
        <h3>
          <div className={'todoListTitle'}>
            <EditableSpan title={title} onChange={changeTodoTitle}/>
            <IconButton onClick={removeTodo} sx={{padding: '2px'}}>
              <DeleteIcon/>
            </IconButton>
          </div>
        </h3>
        <AddItemForm addItem={addTask}/>
      </div>
      <div className={'todoListTasks'}>
        {
          tasksForTodolist.map(t => <Task task={t} todoListID={todoListID} key={t.id}/>)
        }
      </div>
      <div className={'todoListFilter'}>
        <div className={'filterButtons'}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
            <Button onClick={setAll}
                    variant={filter === 'all' ? 'contained' : 'outlined'}>All
            </Button>
            <Button onClick={setActive}
                    variant={filter === 'active' ? 'contained' : 'outlined'}>Active
            </Button>
            <Button onClick={setCompleted}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}>Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
});

export {Todolist};