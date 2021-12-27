import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormPropsType = {
  addItem: (newTitle: string) => void
}

const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const addNewTask = () => {
    if (newTaskTitle.trim()) {
      setError(false);
      addItem(newTaskTitle.trim());
    } else {
      setError(true);
    }
    setNewTaskTitle('');
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    (e.key === 'Enter') && addNewTask();
  };

  return (
    <div className={'addTaskInput'}>
      <TextField label="Title"
                 variant="outlined"
                 size="small"
                 value={newTaskTitle}
                 onChange={onInputChange}
                 onKeyPress={onEnterPress}
                 error={error}
                 sx={{width: '160px'}}/>
      <IconButton onClick={addNewTask}
                  sx={{padding: '2px'}}>
        <AddCircleOutlineIcon color="primary"/>
      </IconButton>
    </div>
  );
});

export {AddItemForm};