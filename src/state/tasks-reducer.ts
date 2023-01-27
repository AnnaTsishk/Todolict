import {TasksStateType} from "../stories/tresh/App";
import {AddTodolistActionType, RemoveTodolistActionType,SetTodolistsActionType} from "./todolists-reducer";
import {TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";

//types

export type TasksActionsType =
    |ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

const initialState:TasksStateType ={}

export const tasksReducer = (state: TasksStateType= initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            return {...state,[action.todolistId]:state[action.todolistId].filter(task => task.id != action.taskId)}
        case "ADD-TASK":
            return {...state,[action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(task=> task.id === action.taskId ? {...task, ...action.model} : task)}



        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]:[]}

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        case "SET-TODOLISTS":{
            const stateCopy = {...state}
            action.todolists.forEach(todolist=>{
                stateCopy[todolist.id]=[]
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
        // throw new Error("I don't understand this action type")
    }
}
//actions
export const removeTaskAC= (todolistId: string, taskId: string) =>({type:'REMOVE-TASK',todolistId: todolistId, taskId: taskId}as const)
export const addTaskAC= (task: TaskType)=>({type:'ADD-TASK', task}as const)
export const updateTaskAC= (taskId: string, status: UpdateDomainTaskType, todolistId: string)=>({type:'UPDATE-TASK', taskId: taskId, model:status, todolistId: todolistId}as const)
export const changeTaskTitleAC= (taskId: string, newTitle: string, todolistId: string) =>({type:'CHANGE-TASK-TITLE', taskId: taskId, newTitle: newTitle, todolistId: todolistId}as const)
export const setTasksAC= (tasks: Array<TaskType>, todolistId: string) =>({type:'SET-TASKS', tasks, todolistId}as const)

//thunks
export const fetchTasksTC = (todolistId:string)=>(dispatch: Dispatch<AppActionsType>)=>{
          todolistsAPI.getTasks(todolistId)
            .then((res)=>{
                const tasks=res.data.items
                const action=setTasksAC(tasks, todolistId)
                dispatch(action)
            })
}
export const removeTaskTC = (todolistId: string, taskId:string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            const action = removeTaskAC(todolistId, taskId)
            dispatch(action)
        })
}
export const addTaskTC = (newTaskTitle: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.createTask(newTaskTitle, todolistId)
        .then((res) => {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}

export const updateTaskTC = (taskId: string, domainModel:UpdateDomainTaskType, todolistId: string): AppThunk=>
    (dispatch:Dispatch<AppActionsType>, getState: ()=>AppRootStateType)=>  {
        const state = getState()
        const task = state.tasks[todolistId].find(task=>task.id === taskId)
        if (!task){
            throw new Error('task not found in the state')
            // console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res)=>{
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
