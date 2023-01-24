import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunkMiddleware from "redux-thunk";




const rootReducer= combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
 // type AppRootState={
 //     todolists: Array<TodolistType>
 //     tasks: TasksStateType
 // }

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootState = ReturnType<typeof rootReducer>


// @ts-ignore
window.store=store