import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistFilterTC,
    changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistTC, TodolistDomainType,
} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {
    addTaskTC,
    removeTaskTC, updateTaskTC
} from "../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {AppRootStateType} from "../state/store";
import {useAppDispatch} from "./hooks";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App1(){
    //
    // const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state=>state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     const thunk = fetchTodolistsTC()
    //     dispatch(thunk)
    // }, [])
    // const changeTodolistTitle=useCallback((id:string, title: string)=> {
    //     const thunk = changeTodolistTitleTC(id, title)
    //     dispatch(thunk)},[dispatch])
    //
    //  const addTask=useCallback ((newTaskTitle: string, todolistId: string)=> {
    //       const thunk = addTaskTC(newTaskTitle, todolistId);
    //     dispatch(thunk)},[])
    //
    // const removeTask= useCallback((todolistId: string,taskId: string)=> {
    //        const thunk = removeTaskTC (todolistId,taskId)
    //     dispatch(thunk)
    // }, [])
    //
    // const removeTodolist = useCallback( (todolistId: string)=> {
    //     const thunk = removeTodolistTC(todolistId)
    //     dispatch(thunk)},[]);
    //
    //
    // const addTodolist= useCallback((title: string)=>{
    //     const thunk =addTodolistTC(title);
    //     dispatch(thunk)},[]);
    //
    // const changeFilter= useCallback((id:string, filter: FilterValuesType)=> {
    //     const thunk = changeTodolistFilterTC(id, filter)
    //     dispatch(thunk) }, [])
    //
    // const changeTaskStatus = useCallback((taskId: string, status:TaskStatuses, todolistId: string) => {
    //     const thunk = updateTaskTC (taskId, {status}, todolistId)
    //     dispatch(thunk) }, [])
    //
    // const changeTaskTitle= useCallback((taskId: string, newTitle: string, todolistId: string)=> {
    //     const thunk = updateTaskTC (taskId, {title:newTitle}, todolistId)
    //     dispatch(thunk)}, [])


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
                <TodolistsList/>
            </Container>
        </div>
    );
}
export type TodolistsListPropsType = {}
const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
    const dispatch = useAppDispatch();
    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])
    const changeTodolistTitle=useCallback((id:string, title: string)=> {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)},[dispatch])

    const addTask=useCallback ((newTaskTitle: string, todolistId: string)=> {
        const thunk = addTaskTC(newTaskTitle, todolistId);
        dispatch(thunk)},[])

    const removeTask= useCallback((todolistId: string,taskId: string)=> {
        const thunk = removeTaskTC (todolistId,taskId)
        dispatch(thunk)
    }, [])

    const removeTodolist = useCallback( (todolistId: string)=> {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)},[]);


    const addTodolist= useCallback((title: string)=>{
        const thunk =addTodolistTC(title);
        dispatch(thunk)},[]);

    const changeFilter= useCallback((id:string, filter: FilterValuesType)=> {
        const thunk = changeTodolistFilterTC(id, filter)
        dispatch(thunk) }, [])

    const changeTaskStatus = useCallback((taskId: string, status:TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC (taskId, {status}, todolistId)
        dispatch(thunk) }, [])

    const changeTaskTitle= useCallback((taskId: string, newTitle: string, todolistId: string)=> {
        const thunk = updateTaskTC (taskId, {title:newTitle}, todolistId)
        dispatch(thunk)}, [])
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map((todolist) => {
                    let tasksForTodolist = tasks[todolist.id];
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
    </>

}
export default App1;
