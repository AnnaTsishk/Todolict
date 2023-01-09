import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";


export type TaskType ={
    id: string
    title: string
    isDone: boolean
}
export type TodolistType ={
    id: string
    title: string
    changeFilter:(value:FilterValuesType,todolistId: string )=> void
    filter: FilterValuesType
    removeTodolist:(todolistId: string)=>void
    changeTodolistTitle: (newTitle:string, id:string)=>void
}
export function Todolist (props: TodolistType) {
const tasks = useSelector<AppRootState, Array<TaskType>>(state=>state.tasks[props.id])
const dispatch = useDispatch();
    const onAllClickHandler  =()=>{props.changeFilter ('all', props.id)}
    const onActiveClickHandler =()=>{props.changeFilter('active', props.id)}
    const onCompletedClickHandler =()=>{props.changeFilter('completed', props.id)}
    const removeTodolist = ()=>{ props.removeTodolist(props.id)}
    const changeTodolistTitle = (newTitle:string)=>{props.changeTodolistTitle(props.id, newTitle)}
    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false);
    }
    return(
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title)=>{
                dispatch(addTaskAC(title, props.id));
            }}/>
            <div>{
                tasksForTodolist.map(el => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(el.id, props.id));
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        // taskId, newTitle, todolistId
                        dispatch(changeTaskStatusAC(el.id,  newIsDoneValue, props.id));
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(el.id, newValue, props.id));
                    }

                    return <div key={el.id} className={el.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeStatusHandler} checked={el.isDone}/>
                        <EditableSpan title={el.title}
                                      onChange={onChangeTitleHandler}/>

                        <IconButton aria-label="delete" onClick={onRemoveHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
            </div>
            <div>
                <Button variant= {props.filter === 'all' ? "contained" : 'text'}
                        onClick={(e)=>{onAllClickHandler()}}>All</Button>
                <Button color={"primary"} variant= {props.filter === 'active' ? "contained" : 'text'}
                        onClick={(e)=>{onActiveClickHandler()}}>Active</Button>
                <Button color={"secondary"} variant= {props.filter === 'completed' ? "contained" : 'text'}
                        onClick={(e)=>{onCompletedClickHandler()}}>Completed</Button>
            </div>
        </div>

    );
}
