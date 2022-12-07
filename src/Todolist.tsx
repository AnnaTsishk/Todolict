import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TasksType ={
    id: string
    title: string
    isDone: boolean
}
export type TodolistType ={
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id:string, todolistId: string)=>void
    changeFilter:(value:FilterValuesType,todolistId: string )=> void
    addTasks: (title: string, todolistId: string)=>void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string)=>void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string)=>void
    filter: FilterValuesType
    removeTodolist:(todolistId: string)=>void
    changeTodolistTitle: (newTitle:string, id:string)=>void
}

export function Todolist (props: TodolistType) {
    const onAllClickHandler  =()=>{props.changeFilter ('all', props.id)}
    const onActiveClickHandler =()=>{props.changeFilter('active', props.id)}
    const onCompletedClickHandler =()=>{props.changeFilter('completed', props.id)}
    const removeTodolist = ()=>{ props.removeTodolist(props.id)}
    const changeTodolistTitle = (newTitle:string)=>{props.changeTodolistTitle(props.id, newTitle)}

    const addTask =(title: string)=>{
props.addTasks(title, props.id);
    }
    return(
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>{
                props.tasks.map(el => {
                    const onRemoveHandler = () => {
                        props.removeTask(el.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(el.id, newValue, props.id)
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
