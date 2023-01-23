import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TaskPropsType={
    changeTaskStatus: (taskId: string,
                       status: TaskStatuses.New,
                       todolistId: string)=>void
    changeTaskTitle:(taskId: string, newTitle: string, todolistId: string)=>void
    removeTask:(taskId: string, todolistId: string)=>void
    task: TaskType
    todolistId: string
    }

export const Task = React.memo((props: TaskPropsType)=> {
    const dispatch = useDispatch();
    const onRemoveHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId));
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue ? TaskStatuses.Completed: TaskStatuses.New, props.todolistId));
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },[props.task.id, props.changeTaskTitle, props.todolistId])

    return <div key={props.task.id} className={props.task.status ===TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox onChange={onChangeStatusHandler} checked={props.task.status ===TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>

        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})