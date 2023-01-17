import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {store} from "./state/store";
import {Provider} from "react-redux";

export default {
    title: 'Task Component',
    component: Task
}
const changeTaskStatusCallback = action('Status changed');
const changeTaskTitleCallback = action('Title changed');
const changeTaskCallback = action('Task removed');


export const TaskBaseExample = ()=> {
    return <Provider store={store}>
         <Task
            task={{id:'1', title: "CSS", isDone: true}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistId1'}
          />
        <Task
            task={{id:'2', title: "JS", isDone: false}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistId2'}
        />
    </Provider>
}