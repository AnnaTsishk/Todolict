import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
     addItem: (newTaskTitle: string) => void
}

export const AddItemForm= React.memo((props: AddItemFormPropsType)=> {
    console.log('AddItemForm is called')
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>( null)

    const addItem =()=>{
        if (newTaskTitle.trim() !=="") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        }else{
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const onClickHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }
    return <div>
        <TextField value={newTaskTitle}
                   variant={'outlined'}
                   label={'Type value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
               <IconButton onClick={onClickHandler} color={"primary"}>
                  <AddBox/>
               </IconButton>


    </div>

})