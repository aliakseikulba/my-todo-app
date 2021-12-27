import React, {ChangeEvent, useCallback} from 'react';
import {FilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../redux/tasks-reducer';

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
  console.log('Todolist');
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
  const changeTodoTitle = (newTitle: string) => {
    changeTodoListTitle(todoListID, newTitle);
  };

  let tasksForTodolist = tasks;
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  const addTask = useCallback((title: string) => dispatch(addTaskAC(title, todoListID)), [dispatch, todoListID]);

  const setAll = () => changeFilter('all', todoListID);
  const setActive = () => changeFilter('active', todoListID);
  const setCompleted = () => changeFilter('completed', todoListID);


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
          tasksForTodolist.map(t => {

            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, todoListID));
            };
            const onClickHandler = () => {
              dispatch(removeTaskAC(t.id, todoListID));
            };
            const onChangeTitle = (newValue: string) => {
              dispatch(changeTaskTitleAC(t.id, newValue, todoListID));
            };

            return (
              <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                <div className={'taskArea'}>
                  <Checkbox checked={t.isDone}
                            onChange={onChangeStatus}
                            size="small"
                            sx={{padding: 0, marginRight: '10px'}}/>
                  <EditableSpan title={t.title} onChange={onChangeTitle}/>
                  <IconButton size="small"
                              className={'taskDelete'}
                              onClick={onClickHandler}
                              sx={{padding: '2px'}}>
                    <DeleteOutlineIcon/>
                  </IconButton>
                </div>
              </div>
            );
          })
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