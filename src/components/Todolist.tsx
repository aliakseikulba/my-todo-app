import React, {ChangeEvent} from 'react';
import {FilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todoListID: string) => void
  filterValue: FilterType
  changeFilter: (filterValue: FilterType, todoListID: string) => void
  addTask: (title: string, todoListID: string) => void
  changeTaskStatus: (id: string, value: boolean, todoListID: string) => void
  changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

const Todolist = (props: TodolistPropsType) => {
  const {
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    filterValue,
    todoListID,
    removeTodoList,
    changeTodoListTitle
  } = props;

  const removeTodo = () => {
    removeTodoList(todoListID);
  };
  const changeTodoTitle = (newTitle: string) => {
    changeTodoListTitle(todoListID, newTitle);
  };


  const tasksForRender = tasks.map(t => {

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(t.id, e.currentTarget.checked, todoListID);
    };
    const onClickHandler = () => {
      removeTask(t.id, todoListID);
    };

    const onChangeTitle = (newValue: string) => {
      changeTaskTitle(t.id, newValue, todoListID);
    };

    return (
      <li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
      </li>);
  });
  const setAll = () => changeFilter('all', todoListID);
  const setActive = () => changeFilter('active', todoListID);
  const setCompleted = () => changeFilter('completed', todoListID);
  const addNewTask = (title: string) => {
    addTask(title, todoListID);
  };


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
        <AddItemForm addItem={addNewTask}/>
      </div>
      <div className={'todoListTasks'}>
        <ul>
          {tasksForRender}
        </ul>
      </div>
      <div className={'todoListFilter'}>
        <div className={'filterButtons'}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
            <Button onClick={setAll}
                    variant={filterValue === 'all' ? 'contained' : 'outlined'}>All
            </Button>
            <Button onClick={setActive}
                    variant={filterValue === 'active' ? 'contained' : 'outlined'}>Active
            </Button>
            <Button onClick={setCompleted}
                    variant={filterValue === 'completed' ? 'contained' : 'outlined'}>Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export {Todolist};