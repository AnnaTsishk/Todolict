import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeStatus: (taskId: string, isDone: boolean, todolistId: string)=>void
    filter: FilterValuesType
    removeTodolist:(todolistId: string)=>void
}

export function Todolist (props: TodolistType) {
    const onAllClickHandler  =()=>{props.changeFilter ('all', props.id)}
    const onActiveClickHandler =()=>{props.changeFilter('active', props.id)}
    const onCompletedClickHandler =()=>{props.changeFilter('completed', props.id)}
    const removeTodolist = ()=>{ props.removeTodolist(props.id)}

    const addTask =(title: string)=>{
props.addTasks(title, props.id);
    }



    return(
        <div>
            <h3>{props.title}  <button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>{
                props.tasks.map(el => {
                    const onRemoveHandler=()=> {props.removeTask(el.id, props.id)}
                    const onChangeHandler =(e: ChangeEvent<HTMLInputElement> )=>{
                        props.changeStatus(el.id, e.currentTarget.checked, props.id)
                        }
                    return <li key={el.id} className={el.isDone ? 'is-done': ''}>
                        <input type="checkbox"
                        onChange={onChangeHandler}
                               checked={el.isDone}/>
                        <EditableSpan title={el.title}/>

                        <button onClick={onRemoveHandler}>X</button>
                    </li>
                })
            }
             </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter": ''}
                        onClick={(e)=>{onAllClickHandler()}}>All</button>
                <button className={props.filter === 'active' ? "active-filter": ''}
                        onClick={(e)=>{onActiveClickHandler()}}>Active</button>
                <button className={props.filter === 'completed' ? "active-filter": ''}
                        onClick={(e)=>{onCompletedClickHandler()}}>Completed</button>
            </div>
        </div>

    );
}
