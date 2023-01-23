import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}
const changeTaskStatusCallback = action('Status changed');
const changeTaskTitleCallback = action('Title changed');
const changeTaskCallback = action('Task removed');


export const TaskBaseExample = ()=> {
    return <>
         <Task
            task={{id:'1', title: "CSS", status: TaskStatuses.Completed,todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistId1'}
          />
        <Task
            task={{id:'2', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistId2'}
        />
    </>
}