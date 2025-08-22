import React, { useEffect, useState } from 'react';
import "../css/Todo.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaMinusCircle } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { getTodosData, addTodoData, deleteTodoData } from "../slices/todoSlice";
import { addInprogressData } from "../slices/inprogressSlice"


function TodoCard() {

    const [inputValue, setInputValue] = useState(""); // input değeri

    const dispatch = useDispatch();
    const { todoText } = useSelector((store) => store.todo);


    useEffect(() => {
        dispatch(getTodosData());
    }, [dispatch]);


    const iconDelete = { color: "#f44336", cursor: "pointer" };
    const iconCheck = { color: "#4caf50", cursor: "pointer" };
    const iconAdd = { color: "#2196f3", cursor: "pointer", marginLeft: "auto" };


    const handleAdd = () => {
        if (inputValue.trim() === "") return; // boş ekleme engelle
        dispatch(addTodoData({ todo_text: inputValue }));
        setInputValue(""); // input temizle
    };


    const handleDelete = (id) => {
        dispatch(deleteTodoData(id));
    };

    const handleInprogress = (data, id) => {
        dispatch(addInprogressData(data));
        handleDelete(id);
    }


    return (
        <div className="column todo">
            <h2>To Do</h2>

            {/* todo listesi */}
            {todoText?.map((text, index) => (
                <div className="card" key={index}>
                    <p style={{ width: "300px", wordWrap: "break-word" }}>{text.todo_text}</p>
                    <Button variant="text" sx={iconDelete} onClick={() => handleDelete(text.todo_id)}>
                        <FaMinusCircle size={20} />
                    </Button>
                    <Button variant="text" sx={iconCheck} onClick={() => handleInprogress(text.todo_text, text.todo_id)}><MdDone size={20} /></Button>
                </div>
            ))}

            {/* input + ekle butonu */}
            <Stack spacing={0} direction="row">
                <TextField
                    id="standard-search"
                    label="To Do Ekle"
                    type="search"
                    variant="filled"
                    color="info"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    sx={{
                        width: "350px",
                        "& .MuiFilledInput-input": {
                            color: "white", // kullanıcının yazdığı metin
                        },
                        "& .MuiInputLabel-root": {
                            color: "white", // label rengi
                        },
                    }}
                />
                <Button variant="text" sx={iconAdd} onClick={handleAdd}>
                    <FaCirclePlus size={20} />
                </Button>
            </Stack>
        </div>
    );
}

export default TodoCard;
