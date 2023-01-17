import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitletAC,
    removeTodolistAC,
  } from "./state/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux(){


    const todolists = useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state=>state.tasks)
    const dispatch = useDispatch();

    const changeTodolistTitle=useCallback((id: string, newTitle: string)=> {
        const action = changeTodolistTitletAC(id, newTitle)
        dispatch(action)},[dispatch])
    const addTask=useCallback ((newTaskTitle: string, todolistId: string)=> {
        const action = addTaskAC(newTaskTitle, todolistId);
        dispatch(action)},[dispatch])
    const removeTask= useCallback((id: string, todolistId: string)=> {
              dispatch(removeTaskAC(id, todolistId))}, [dispatch])
    const removeTodolist = useCallback( (todolistId: string)=> {
        const action = removeTodolistAC(todolistId)
        dispatch(action)},[dispatch]);
    const addTodolist= useCallback((newTaskTitle: string)=>{
        const action =addTodolistAC(newTaskTitle);
        dispatch(action)},[dispatch]);
    const changeFilter= useCallback((value: FilterValuesType, todolistId: string)=> {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action) }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action) }, [dispatch])
    const changeTaskTitle= useCallback((taskId: string, newTitle: string, todolistId: string)=> {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))}, [dispatch])

    let tasksForTodolist=tasks
    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todolist) => {
                            return <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                        removeTask={removeTask}
                                        changeTodolistTitle={changeTodolistTitle}

                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
