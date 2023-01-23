import {TodolistType} from "../api/todolists-api";


export type RemoveTodolistActionType={
   type: "REMOVE-TODOLIST",
    id: string
}
export type SetTodolistsActionType={
    type: "SET-TODOLISTS",
    todolists:Array<TodolistType>
}
export type AddTodolistActionType={
    type: "ADD-TODOLIST"
    title: string
    // todolistId: string
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
type ActiosType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType


const initialState: Array<TodolistDomainType> =[]

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistDomainType = TodolistType & {
filter:FilterValuesType
}
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActiosType): Array<TodolistDomainType> => {
    switch (action.type){
        case "REMOVE-TODOLIST": {
            return state.filter(todolist => todolist.id !=
                action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.title,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
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
        case "SET-TODOLISTS":{
           return action.todolists.map(todolists =>{
               return{
                 ...todolists,
                   filter:"all"
               }
           } )
        }
        return [...state]
        default:
            return state;
            // throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC= (todolistId: string): RemoveTodolistActionType =>{
    return {type:'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC= (title: string): AddTodolistActionType =>
{return {type:'ADD-TODOLIST', title: title}
}
export const changeTodolistTitletAC= (id:string, title: string): ChangeTodolistActionType =>{
    return {type:'CHANGE-TODOLIST_TITLE', id: id, title:title}
}
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', value: value, todolistId}
}
export const setTodolistsAC = (todolists:Array<TodolistType>): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists:todolists}
}