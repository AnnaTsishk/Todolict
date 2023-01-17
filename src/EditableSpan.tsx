import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange:(newValue:string)=>void
}

export const  EditableSpan= React.memo((props: EditableSpanPropsType)=>{
    console.log('EditableSpan is called')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const activateEditMode = () =>{
        setEditMode(true);
        setTitle(props.title);
}
    const activateViewMode =()=> {
        setEditMode(false);
        props.onChange(title)
    }
    const changeTitle =(e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})