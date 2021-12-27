import React, {ChangeEvent, useCallback, useState} from 'react';
import {Input} from '@mui/material';

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

const EditableSpan = React.memo(({title, onChange}: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [inputTitle, setInputTitle] = useState('');

  const activateEditMode = useCallback(() => {
    setEditMode(true);
    setInputTitle(title);
  }, [title]);
  const activateViewMode = useCallback(() => {
    setEditMode(false);
    onChange(inputTitle);
  }, [onChange, inputTitle]);
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.currentTarget.value);

  return editMode
    ? <Input value={inputTitle} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
    : <div className={'editableTitle'} onDoubleClick={activateEditMode}>{title}</div>;
});

export {EditableSpan};