import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
let todolistId1:string = v1();
let todolistId2:string = v1();

let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistId1, title: "What to learn", filter: 'all', addedDate: '',
        order:0},
    {id: todolistId2, title: "What to buy", filter: 'active', addedDate: '',
        order:0}
])
let removeTodolist = ((todolistId: string) => {
    let filteredTodolist = todolists.filter(todolist => todolist.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasks[todolistId];
    setTasks({...tasks});
})

let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
        {id: v1(), title: "CSS", status:TaskStatuses.Completed,
            todoListId: todolistId1, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false},
        {id: v1(), title: "HTML", status:TaskStatuses.Completed,
            todoListId: todolistId1, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false
        },
        {id: v1(), title: "JS", status:TaskStatuses.New,
            todoListId: todolistId1, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false},
        {id: v1(), title: "React", status:TaskStatuses.New,
            todoListId: todolistId1, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false
        },
        {id: v1(), title: "Redux", status:TaskStatuses.New,
            todoListId: todolistId1, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false
        }
    ],
    [todolistId2]: [
        {id: v1(), title: "Book", status:TaskStatuses.New,
            todoListId: todolistId2, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false
        },
        {id: v1(), title: "Milk", status:TaskStatuses.Completed,
            todoListId: todolistId2, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false
        }
    ],
});
export function App() {
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id != id)
        setTasks({...tasks});
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(todolist => todolist.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, status:TaskStatuses.New,
            todoListId: todolistId, startDate:'', deadline:'', addedDate:'',
            order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        let todolistTasks = tasks[todolistId]
        let newTasks = [newTask, ...todolistTasks]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }


    function changeStatus(taskId: string, status:TaskStatuses, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }


    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            filter: "all",
            title: title,
            addedDate: '',
            order: 0
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
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
                            let tasksForTodolist = tasks[todolist.id];

                            if (todolist.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status=== TaskStatuses.New);
                            }
                            if (todolist.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed);
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
                                        addTask={addTask}
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
