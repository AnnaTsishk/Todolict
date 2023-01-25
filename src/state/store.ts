import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";






const rootReducer= combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppThunk<ReturnType = void>=ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>




// @ts-ignore
window.store=store