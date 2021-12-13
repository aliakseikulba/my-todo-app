import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './redux/todoLists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './redux/tasks-reducer';


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
  const todoListID_1 = v1();
  const todoListID_2 = v1();
  const [todoLists, todoListsDispatch] = useReducer(todoListsReducer, [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'completed'},
  ]);
  const [tasks, tasksDispatch] = useReducer(tasksReducer, {
    [todoListID_1]: [
      {id: v1(), title: 'HTML & CSS', isDone: true},
      {id: v1(), title: 'JavaScript', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
    ],
    [todoListID_2]: [
      {id: v1(), title: 'Bread', isDone: true},
      {id: v1(), title: 'Jam', isDone: true},
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Butter', isDone: false},
    ]
  });

  const addTask = (title: string, todoListID: string) => {
    tasksDispatch(addTaskAC(title, todoListID));
  };
  const removeTask = (taskID: string, todoListID: string) => {
    tasksDispatch(removeTaskAC(taskID, todoListID));
  };
  const changeTaskStatus = (taskID: string, value: boolean, todoListID: string) => {
    tasksDispatch(changeTaskStatusAC(taskID, value, todoListID));
  };
  const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
    tasksDispatch(changeTaskTitleAC(taskID, newTitle, todoListID));
  };

  const removeTodoList = (todoListID: string) => {
    todoListsDispatch(removeTodoListAC(todoListID));
  };
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    todoListsDispatch(action);
    tasksDispatch(action);
  };
  const changeTodoListTitle = (todoListID: string, newTitle: string) => {
    todoListsDispatch(changeTodoListTitleAC(todoListID, newTitle));
  };
  const changeFilter = (filterValue: FilterType, todoListID: string) => {
    todoListsDispatch(changeTodoListFilterAC(todoListID, filterValue));
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
