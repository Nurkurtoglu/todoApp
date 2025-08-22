import React from 'react'
import "../css/Done.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaMinusCircle } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDoneData, deleteDoneData } from "../slices/doneSlice";


function DoneCard() {

    const dispatch = useDispatch();

    const { doneText } = useSelector((store) => store.done);

    useEffect(() => {
        dispatch(getDoneData());
    }, [dispatch]);

    const handleDone = (id) => {
        dispatch(deleteDoneData(id));
    }


    const iconEdit = { color: "#2196f3", cursor: "pointer" };
    const iconDelete = { color: "#f44336", cursor: "pointer" };
    const iconCheck = { color: "#4caf50", cursor: "pointer" };
    const iconAdd = { color: "#2196f3", cursor: "pointer", marginLeft: "auto" };

    return (
        <div className="column designed">
            <h2>Done</h2>
            {/* <div className="card">
                <p style={{ width: "300px" }}>UI Prototype completed </p>
                <Button variant="text" sx={iconDelete}><FaMinusCircle size={20} /></Button>
                <Button variant="text" sx={iconCheck}><MdDone size={20} /></Button>
            </div> */}
            {doneText?.map((text, index) => (
                <div className="card" key={index}>
                    <p style={{ width: "300px", wordWrap: "break-word" }}>{text.done_text}</p>
                    <Button variant="text" sx={iconCheck} onClick={() => handleDone(text.done_id)}><MdDone size={20} /></Button>
                </div>
            ))}
        </div>
    )
}

export default DoneCard