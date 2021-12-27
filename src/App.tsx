import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from './redux/todoLists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './redux/store';


export type FilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const App = () => {
  console.log('App');
  const todoLists = useSelector<RootStateType, Array<TodoListType>>(state => state.todoLists);
  const dispatch = useDispatch();

  const removeTodoList = useCallback((todoListID: string) => {
    dispatch(removeTodoListAC(todoListID));
  }, [dispatch]);
  const addTodoList = useCallback((title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  }, [dispatch]);
  const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoListID, newTitle));
  }, [dispatch]);
  const changeFilter = useCallback((filterValue: FilterType, todoListID: string) => {
    dispatch(changeTodoListFilterAC(todoListID, filterValue));
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            TodoList
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container
              spacing={4}>
          {todoLists.map(tl => {
            return (
              <Grid item key={tl.id}>
                <Paper elevation={8} sx={{padding: '20px'}}>
                  <Todolist
                    todoListID={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}/>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
