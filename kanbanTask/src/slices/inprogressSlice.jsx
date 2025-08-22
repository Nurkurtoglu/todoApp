
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


const initialState = {
    inprogressText: [],
    status: "idle",
    error: null
}

export const getInprogressData = createAsyncThunk("inprogress/fetchInprogress", async () => {

    const res = await axios.get("http://localhost:5000/inprogress");
    return res.data;

});

export const addInprogressData = createAsyncThunk("inprogress/addInprogress", async (text) => {
    const res = await axios.post("http://localhost:5000/inprogress", { inprogress_text: text });
    console.log(res);
    return res.data;
});

export const deleteInprogressData = createAsyncThunk("inprogress/deleteInprogress", async (id) => {
    const res = await axios.delete(`http://localhost:5000/inprogress/${id}`);
    return id;
});

export const inprogressSlice = createSlice({
    name: 'inprogress',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getInprogressData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getInprogressData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.inprogressText = action.payload;
            });

        builder.addCase(addInprogressData.pending, (state) => {
            state.status = "loading";
        }).addCase(addInprogressData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.inprogressText.push(action.payload);
        });

        builder.addCase(deleteInprogressData.pending, (state) => {
            state.status = "loading";
        }).addCase(deleteInprogressData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.inprogressText = state.inprogressText.filter((inprogress) => inprogress.inprogress_id !== action.payload);
        });
    }
});

// this is for dispatch
export const { } = inprogressSlice.actions;

// this is for configureStore
export default inprogressSlice.reducer;
