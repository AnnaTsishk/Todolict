import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {TasksStateType} from "../App";

let startState:TasksStateType={}
    beforeEach(()=>{
   startState = {
               'todolistId1': [
                {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false},
                {id: '2', title: "HTML", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false},
                {id: '3', title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false},
                {id: '4', title: "React", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false},
                {id: '5', title: "Redux", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false}
            ],
            'todolistId2': [
                {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false},
                {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false},
                {id: '3', title: "tea", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                    order: 0, priority: TaskPriorities.Low, description:'', completed: false}
            ],
        };
})


test('correct task should be deleted from correct array',() =>{
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
        order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '4', title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '5', title: "Redux", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "tea", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
    };
    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(5);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(task=>task.id !="2")).toBeTruthy();
    // expect(endState['todolistId2'][0].id).toBeTruthy('1');
    // expect(endState['todolistId2'][1].id).toBeTruthy('3');
});

test('correct task should be added from correct array',() =>{
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "HTML", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '4', title: "React", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '5', title: "Redux", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
        order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "tea", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
    };

    const action = addTaskAC('juce', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(5);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed',()=>{
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '4', title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '5', title: "Redux", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "tea", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
    };
    const action = changeTaskStatusAC('2', TaskStatuses.New, "todolistId2");

    const endState= tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New);

})

test('title of specified task should be changed',()=>{
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '4', title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '5', title: "Redux", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "tea", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
    };
    const action = changeTaskTitleAC('2', "MilkyWay", "todolistId2");

    const endState= tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("MilkyWay");
    expect(endState['todolistId1'][1].title).toBe("HTML");

})

test('new property with new array should be added when new todolist is added',()=>{
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '4', title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '5', title: "Redux", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "tea", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
    };
    const action = addTodolistAC ('new todolist');
    const endState= tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key
        != "todolistId1" && key != "todolistId2")
    if (!newKey){
        throw Error('new rty should be added' )
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);

})
test('property with todolist should be deleted',()=>{
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '4', title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '5', title: "Redux", status: TaskStatuses.New, todoListId: 'todolistId1', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '2', title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false},
            {id: '3', title: "tea", status: TaskStatuses.New, todoListId: 'todolistId2', startDate:'', deadline:'', addedDate:'',
                order: 0, priority: TaskPriorities.Low, description:'', completed: false}
        ],
    };
    const action = removeTodolistAC ('todolistId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined()
});

test('empty arrays should be added when we set todolists',() =>{
    const action = setTodolistsAC( [
            {id: '1', title: "title 1", order: 0, addedDate:''},
            {id: '2', title: "title 2", order: 0, addedDate:''}
          ])

    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
});

test('tasks should be added for todolist',() =>{
    const action = setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId2':[],
        'todolistId1':[]
    }, action);

    expect(endState['todolistId1'].length).toBe(5);
    expect(endState['todolistId2'].length).toBe(3);

});