import React, {useEffect, useState} from 'react'
import todolistsAPI from "../api/todolists-api";





export default {
    title: 'API'
}
// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'd8a07ad8-1225-42d0-8f3d-e923f741ec23y'
//     }
// }
export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.creteTodolist("New list 4")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "2d63a281-6d8e-4fcd-ac93-48ab61e63783"
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b176546c-85a2-4d1c-8df5-2220aff71bb6"
        todolistsAPI.updateTodolist(todolistId, " Anna1")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks =()=>{
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask =()=>{
        const todolistId='d2d75f93-eb40-4cf1-be76-afed088942ac'
        const taskId= ''
        todolistsAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(event)=>{setTaskId(event.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const createTask =()=>{
         todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
            <input placeholder={'task title'} value={taskTitle} onChange={(event)=>{setTaskTitle(event.currentTarget.value)}}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const updateTask =()=>{
        todolistsAPI.updateTask(todolistId, taskId,{
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title

        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(event)=>{setTaskId(event.currentTarget.value)}}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(event)=>{setTodolistId(event.currentTarget.value)}}/>
            <input placeholder={'TaskTitle'} value={title} onChange={(event)=>{setTitle(event.currentTarget.value)}}/>
            <input placeholder={'description'} value={description} onChange={(event)=>{setDescription(event.currentTarget.value)}}/>
            <input placeholder={'status'} value={status} onChange={(event)=>{setStatus(+event.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority} onChange={(event)=>{setPriority(+event.currentTarget.value)}}/>
            <input placeholder={'startDate'} value={startDate} onChange={(event)=>{setStartDate(event.currentTarget.value)}}/>
            <input placeholder={'deadline'} value={deadline} onChange={(event)=>{setDeadline(event.currentTarget.value)}}/>

            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}