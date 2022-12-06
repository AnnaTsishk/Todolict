import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from "react";
import {FilterValuesType} from "./App";


export type TasksType ={
    id: string
    title: string
    isDone: boolean
}
export type TodolistType ={
    title: string
    tasks: Array<TasksType>
    removeTask: (id:string)=>void
    changeFilter:(value:FilterValuesType)=> void
    addTasks: (title: string)=>void
}

export function Todolist (props: TodolistType) {
    const [newTaskTitle, setNewTaskTitle]=useState('')
    const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=>{
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if( e.key === 'Enter'){
            props.addTasks(newTaskTitle);
            setNewTaskTitle('')}
    }
    const onClickHandler = ()=> {
        props.addTasks(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler =()=>{props.changeFilter('all')}
    const onActiveClickHandler =()=>{props.changeFilter('active')}
    const onCompletedClickHandler =()=>{props.changeFilter('completed')}
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>{
                props.tasks.map(el => {
                    const onRemoveHandler=()=> {props.removeTask(el.id)}
                    return <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                        <span>{el.title} </span>
                        <button onClick={onRemoveHandler}>X</button>
                    </li>
                })
            }
             </ul>
            <div>
                <button onClick={(e)=>{onAllClickHandler()}}>All</button>
                <button onClick={(e)=>{onActiveClickHandler()}}>Active</button>
                <button onClick={(e)=>{onCompletedClickHandler()}}>Completed</button>
            </div>
        </div>

    );
}

