import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import { Task } from "./Task";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    tasks: any
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
    addTask: (newTaskTitle: string, id: string) => void
    changeTaskStatus:(taskId: string, isDone:boolean, todolistId: string)=>void
    changeTaskTitle:(taskId: string, newTitle: string, todolistId: string)=>void
    removeTask:(taskId: string, todolistId: string)=>void

}
export const Todolist = React.memo(function (props: TodolistType) {
    // console.log('Todolist is called')
    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id)
    }, [props.addTask, props.id]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    // const dispatch = useDispatch();
    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])


    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    // let tasksForTodolist = tasks

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false);
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>{
                tasksForTodolist.map(task =>
                    <Task
                        task={task}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        key={task.id}/>)}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : 'text'}
                        onClick={(e) => {
                            onAllClickHandler()
                        }}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? "contained" : 'text'}
                        onClick={(e) => {
                            onActiveClickHandler()
                        }}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : 'text'}
                        onClick={(e) => {
                            onCompletedClickHandler()
                        }}>Completed</Button>
            </div>
        </div>

    );
})
