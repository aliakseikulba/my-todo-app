import React from 'react';
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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './redux/tasks-reducer';
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

  const todoLists = useSelector<RootStateType, Array<TodoListType>>(state => state.todoListsReducer);
  const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasksReducer);
  const dispatch = useDispatch();

  const addTask = (title: string, todoListID: string) => {
    dispatch(addTaskAC(title, todoListID));
  };
  const removeTask = (taskID: string, todoListID: string) => {
    dispatch(removeTaskAC(taskID, todoListID));
  };
  const changeTaskStatus = (taskID: string, value: boolean, todoListID: string) => {
    dispatch(changeTaskStatusAC(taskID, value, todoListID));
  };
  const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
    dispatch(changeTaskTitleAC(taskID, newTitle, todoListID));
  };

  const removeTodoList = (todoListID: string) => {
    dispatch(removeTodoListAC(todoListID));
  };
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };
  const changeTodoListTitle = (todoListID: string, newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoListID, newTitle));
  };
  const changeFilter = (filterValue: FilterType, todoListID: string) => {
    dispatch(changeTodoListFilterAC(todoListID, filterValue));
  };

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
            TodoLists
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

            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
            }

            return (
              <Grid item key={tl.id}>
                <Paper elevation={8} sx={{padding: '20px'}}>
                  <Todolist
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    filterValue={tl.filter}
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
