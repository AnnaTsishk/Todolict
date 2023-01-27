import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppActionsType, AppThunk} from "./store";
import {Dispatch} from "redux";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id != action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST_TITLE':
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        case "CHANGE_TODOLIST_FILTER":
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        case "SET-TODOLISTS": {
            return action.todolists.map(todolists => {
                return {...todolists, filter: "all"}
            })
        }
        default:
            return state;
        // throw new Error("I don't understand this action type")
    }
}
//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST_TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE_TODOLIST_FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

//thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        throw new Error()
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.creteTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}
export const changeTodolistFilterTC = (id: string, filter: FilterValuesType): AppThunk => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.updateTodolist(id, filter)
        .then((res) => {
            dispatch(changeTodolistFilterAC(id, filter))
        })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
