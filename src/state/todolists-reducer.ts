import {FilterValuesType, TodolistType} from "../App";




export type RemoveTodolistActionType={
   type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType={
    type: "ADD-TODOLIST"
    title: string
 }
export type ChangeTodolistActionType ={
    type:'CHANGE-TODOLIST_TITLE',
    id:string,
    title: string
}
export type ChangeTodolistFilterActionType={
    type:"CHANGE_TODOLIST_FILTER",
    value:FilterValuesType
    todolistId: string
}
type ActiosType = RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistActionType|ChangeTodolistFilterActionType


const initialState: Array<TodolistType> =[]
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActiosType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST": {
            return state.filter(todolist => todolist.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                    id: action.title,
                    title: action.title,
                    filter: 'all'
                },...state]
        }
        case 'CHANGE-TODOLIST_TITLE': {
            const todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }

        case "CHANGE_TODOLIST_FILTER":{
            const todolist = state.find(todolist => todolist.id === action.todolistId)
            if (todolist) {
                // todolist.filter= action.filter;
                todolist.filter= action.value;
            }
            return [...state]
        }
        default:
            return state;
            // throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC= (todolistId: string): RemoveTodolistActionType =>{
    return {type:'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC= (title: string): AddTodolistActionType =>{
    return {type:'ADD-TODOLIST', title}
}
export const changeTodolistTitletAC= (id:string, title: string): ChangeTodolistActionType =>{
    return {type:'CHANGE-TODOLIST_TITLE', id: id, title:title}
}
export const changeTodolistFilterAC= (value:FilterValuesType, todolistId: string ): ChangeTodolistFilterActionType =>{
    return {type:'CHANGE_TODOLIST_FILTER', value: value, todolistId}
}