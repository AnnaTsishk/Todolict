import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType={
   type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType={
    type: "ADD-TODOLIST",
    title: string
}
export type ChangeTodolistActionType ={
    type:'CHANGE-TODOLIST_TITLE',
    id:string,
    title: string
}
export type ChangeTodolistFilterActionType={
    type:"CHANGE_TODOLIST_FILTER",
    id:string,
    filter: FilterValuesType
}
type ActiosType = RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistActionType|ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActiosType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST": {
            return state.filter(todolist => todolist.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [...state,{
                    id: v1(),
                    title: action.title,
                    filter: 'all'
                }]
        }
        case 'CHANGE-TODOLIST_TITLE': {
            const todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }

        case "CHANGE_TODOLIST_FILTER":{
            const todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
            throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC= (todolistId: string): RemoveTodolistActionType =>{
    return {type:'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC= (title: string): AddTodolistActionType =>{
    return {type:'ADD-TODOLIST', title:title}
}
export const changeTodolisTitletAC= (title: string, todolistId: string): ChangeTodolistActionType =>{
    return {type:'CHANGE-TODOLIST_TITLE', id: todolistId, title:title}
}
export const changeTodolistFilterAC= (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>{
    return {type:'CHANGE_TODOLIST_FILTER', id: todolistId, filter:filter}
}