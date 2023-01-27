import React, {useReducer} from 'react';
import '../../app/App.css';
import {Todolist} from "../../Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "../../state/todolists-reducer";
import {
    addTaskAC,
    updateTaskAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    // todolistId
} from "../../state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducers(): any {

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action);
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatchToTodolistsReduser(action);
    }
    function addTask(newTaskTitle: string, todolistId: string) {
        const action = addTaskAC({
            todoListId: todolistId,
            title: newTaskTitle,
            status: TaskStatuses.New,
            order: 0,
            addedDate:"",
            id:"id exists",
            completed: false,
            deadline:"",
            description:'',
            priority: 0,
            startDate:''
        });
        dispatchToTasksReducer(action);
    }
    function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskAC(taskId, {status}, todolistId)
        dispatchToTasksReducer(action);
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = updateTaskAC(taskId, {title:newTitle}, todolistId)
        dispatchToTasksReducer(action);
    }
    function changeFilter(id: string, filter: FilterValuesType) {
        const action = changeTodolistFilterAC(id, filter)
        dispatchToTodolistsReduser(action)
    }
    function removeTodolist (todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReduser(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC({
            title: title,
            id: v1(),
            addedDate: "",
            order: 0,
        })
        dispatchToTasksReducer(action)
        dispatchToTodolistsReduser(action)
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReduser] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: 'all', addedDate: '',
            order:0},
        {id: todolistId2, title: "What to buy", filter: 'active', addedDate: '',
            order:0}
    ])
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS", status:TaskStatuses.Completed,
                todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: v1(), title: "HTML", status:TaskStatuses.Completed,
                todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false
            },
            {id: v1(), title: "JS", status:TaskStatuses.New,
                todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: v1(), title: "React", status:TaskStatuses.New,
                todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false
            },
            {id: v1(), title: "Redux", status:TaskStatuses.New,
                todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false
            }
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", status:TaskStatuses.New,
                todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false
            },
            {id: v1(), title: "Milk", status:TaskStatuses.Completed,
                todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false
            }
        ],
    });

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
                            let tasksForTodolist = tasks[todolist.id];

                            if (todolist.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New);
                            }
                            if (todolist.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed);
                            }
                            return <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
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


export default AppWithReducers;
