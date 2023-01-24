import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";



export type RemoveTaskActionType ={
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType={
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType={
    type:'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string

}
export type ChangeTaskTitleActionType={
    type:'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todolistId: string
}
export type SetTasksActionType ={
    type:'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState:TasksStateType ={}

export const tasksReducer = (state: TasksStateType= initialState, action: ActionsType): TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK": {
            const stateCopy={...state};
            const tasks=state[action.todolistId]
            const filteredTasks= tasks.filter(task => task.id !== action.taskId)
            stateCopy[action.todolistId]=filteredTasks
            return stateCopy;
        }
        case "ADD-TASK":{
            const stateCopy={...state}
            const tasks = stateCopy[action.todolistId]
            const newTask: TaskType ={
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId, startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false
            }
            const newTasks=[newTask, ...tasks];
            stateCopy[action.todolistId]=newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS':{
            const stateCopy={...state}
            const tasks=stateCopy[action.todolistId]
            stateCopy[action.todolistId]=tasks.map(task=> task.id === action.taskId
                ? {...task, status: action.status}
                : task)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const task = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = task.map(task => task.id === action.taskId
                ? {...task, title: action.newTitle}
                : task)
            return stateCopy
        }
        case "ADD-TODOLIST":{
            const stateCopy={...state}
            stateCopy[action.title]=[];
            return stateCopy
        }
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
        case "SET-TASKS":{
            const stateCopy = {...state}
             stateCopy[action.todolistId]=action.tasks
           return stateCopy

        }
        default:
            return state;
            // throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC= (taskId: string, todolistId: string): RemoveTaskActionType =>{
    return {type:'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}
export const addTaskAC= (title: string, todolistId: string): AddTaskActionType =>{
    return {type:'ADD-TASK', title:title, todolistId:todolistId}
}
export const changeTaskStatusAC= (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType =>{
    return {type:'CHANGE-TASK-STATUS', taskId: taskId, todolistId: todolistId, status}
}
export const changeTaskTitleAC= (taskId: string, newTitle: string, todolistId: string) : ChangeTaskTitleActionType =>{
    return {type:'CHANGE-TASK-TITLE', taskId: taskId, newTitle: newTitle, todolistId: todolistId}
}
export const setTasksAC= (tasks: Array<TaskType>, todolistId: string) : SetTasksActionType =>{
    return {type:'SET-TASKS', tasks, todolistId}
}

