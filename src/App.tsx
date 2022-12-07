import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObg[todolistId]
        let filteredTasks = tasks.filter(task => task.id !== id)
        tasksObg[todolistId] = filteredTasks
        setTasks({...tasksObg});
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(todolist => todolist.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObg[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObg[todolistId] = newTasks
        setTasks({...tasksObg})

    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObg[todolistId]
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObg})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObg[todolistId]
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObg})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'active'}
    ])
    let removeTodolist = ((todolistId: string) => {
        let filteredTodolist = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObg[todolistId];
        setTasks({...tasksObg});
    })

    let [tasksObg, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}
        ],
    });

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObg,
            [todolist.id]: []
        })
    }

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
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todolist) => {
                            let tasksForTodolist = tasksObg[todolist.id];

                            if (todolist.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true);
                            }
                            if (todolist.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false);
                            }
                            return <Grid item>
                                <Paper style={{padding:'20px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTasks={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
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


export default App;
