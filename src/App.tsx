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
  TodoListReducer
} from './redux/TodoListReducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  createNewTaskAC, deleteTasksAfterDeletingTodoListAC,
  removeTaskAC,
  TasksReducer
} from './redux/TasksReducer';


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
  const [todoLists, todoListsDispatch] = useReducer(TodoListReducer, [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'completed'},
  ]);
  const [tasks, tasksDispatch] = useReducer(TasksReducer, {
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
    // const newTask = {id: v1(), title, isDone: false};
    // const allTasks = tasks[todoListID];
    // const updatedTasks = [newTask, ...allTasks];
    // tasks[todoListID] = updatedTasks;
    // setTasks({...tasks});
    tasksDispatch(addTaskAC(title, todoListID));
  };
  const removeTask = (id: string, todoListID: string) => {
    // const tasksToRemove = tasks[todoListID];
    // const tasksAfterRemove = tasksToRemove.filter(t => t.id !== id);
    // tasks[todoListID] = tasksAfterRemove;
    // setTasks({...tasks});
    tasksDispatch(removeTaskAC(id, todoListID));
  };
  const changeTaskStatus = (id: string, value: boolean, todoListID: string) => {
    // const tasksToChange = tasks[todoListID];
    // const taskToChange = tasksToChange.find(t => t.id === id);
    // if (taskToChange) {
    //   taskToChange.isDone = value;
    //   setTasks({...tasks});
    // }
    tasksDispatch(changeTaskStatusAC(id, value, todoListID));
  };
  const changeTaskTitle = (id: string, newTitle: string, todoListID: string) => {
    // const tasksToChange = tasks[todoListID];
    // const taskToChange = tasksToChange.find(t => t.id === id);
    // if (taskToChange) {
    //   taskToChange.title = newTitle;
    //   setTasks({...tasks});
    // }
    tasksDispatch(changeTaskTitleAC(id, newTitle, todoListID));
  };

  const removeTodoList = (todoListID: string) => {
    // const todoListsAfterRemove = todoLists.filter(tl => tl.id !== todoListID);
    // setTodoLists(todoListsAfterRemove);
    // delete tasks[todoListID];
    todoListsDispatch(removeTodoListAC(todoListID));
    tasksDispatch(deleteTasksAfterDeletingTodoListAC(todoListID));
  };
  const addTodoList = (title: string) => {
    // const newTodoList: TodoListType = {
    //   id: v1(),
    //   title,
    //   filter: 'all'
    // };
    // setTodoLists([newTodoList, ...todoLists]);
    // setTasks({
    //   ...tasks,
    //   [newTodoList.id]: []
    // });
    const newID = v1();
    todoListsDispatch(addTodoListAC(title, newID));
    tasksDispatch(createNewTaskAC(newID));
  };
  const changeTodoListTitle = (id: string, newTitle: string) => {
    // const rightTodolist = todoLists.find(tl => tl.id === id);
    // if (rightTodolist) {
    //   rightTodolist.title = newTitle;
    //   setTodoLists([...todoLists]);
    // }
    todoListsDispatch(changeTodoListTitleAC(id, newTitle));
  };
  const changeFilter = (filterValue: FilterType, todoListID: string) => {
    // const todoListToFilter = todoLists.find(tl => tl.id === todoListID);
    // if (todoListToFilter) {
    //   todoListToFilter.filter = filterValue;
    //   setTodoLists([...todoLists]);
    // }
    todoListsDispatch(changeTodoListFilterAC(filterValue, todoListID));
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
              <Grid item>
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
