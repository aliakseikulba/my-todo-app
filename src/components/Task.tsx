import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../redux/tasks-reducer';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch} from 'react-redux';
import {TaskType} from './Todolist';

type TaskPropsType = {
  task: TaskType
  todoListID: string
}

const Task = React.memo(({task, todoListID}: TaskPropsType) => {

  const dispatch = useDispatch();

  const onChangeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoListID));
  }, [dispatch, task.id, todoListID]);
  const onClickHandler = useCallback(() => {
    dispatch(removeTaskAC(task.id, todoListID));
  }, [dispatch, task.id, todoListID]);
  const onChangeTitle = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(task.id, newValue, todoListID));
  }, [dispatch, task.id, todoListID]);

  return (
    <div className={task.isDone ? 'is-done' : ''}>
      <div className={'taskArea'}>
        <Checkbox checked={task.isDone}
                  onChange={onChangeStatus}
                  size="small"
                  sx={{padding: 0, marginRight: '10px'}}/>
        <EditableSpan title={task.title} onChange={onChangeTitle}/>
        <IconButton size="small"
                    className={'taskDelete'}
                    onClick={onClickHandler}
                    sx={{padding: '2px'}}>
          <DeleteOutlineIcon/>
        </IconButton>
      </div>
    </div>
  );
});

export default Task;