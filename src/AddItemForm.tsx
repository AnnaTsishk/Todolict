import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
     addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('' && null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
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
        <input value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ""}
        />
        <button onClick={onClickHandler}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>

}