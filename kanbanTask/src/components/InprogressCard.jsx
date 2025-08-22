import React from 'react'
import "../css/Inprogress.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaMinusCircle } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getInprogressData, deleteInprogressData } from "../slices/inprogressSlice";
import { addDoneData } from "../slices/doneSlice";


function InprogressCard() {

    const iconDelete = { color: "#f44336", cursor: "pointer" };
    const iconCheck = { color: "#4caf50", cursor: "pointer" };
    const iconAdd = { color: "#2196f3", cursor: "pointer", marginLeft: "auto" };


    const dispatch = useDispatch();

    const { inprogressText } = useSelector((store) => store.inprogress);

    useEffect(() => {
        dispatch(getInprogressData());
    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(deleteInprogressData(id));
    }

    const handleDone = (data, id) => {
        dispatch(addDoneData(data));
        handleDelete(id);
    }

    return (
        <div className="column inprogress">
            <h2>In Progress</h2>
            {/* <div className="card" >
                <p style={{ width: "300px" }}>Veritabanı bağlantısı (Firestore) kodlanıyor</p>

                <Button variant="text" sx={iconDelete}><FaMinusCircle size={20} /></Button>
                <Button variant="text" sx={iconCheck}><MdDone size={20} /></Button>
            </div> */}
            {inprogressText?.map((text, index) => (
                <div className="card" key={index}>
                    <p style={{ width: "300px", wordWrap: "break-word" }}>{text.inprogress_text}</p>
                    <Button variant="text" sx={iconDelete} onClick={() => handleDelete(text.inprogress_id)}>
                        <FaMinusCircle size={20} />
                    </Button>
                    <Button variant="text" sx={iconCheck} onClick={() => handleDone(text.inprogress_text, text.inprogress_id)}><MdDone size={20} /></Button>
                </div>
            ))}

        </div>
    )
}

export default InprogressCard