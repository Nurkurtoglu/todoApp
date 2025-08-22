
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


const initialState = {
    doneText: [],
    status: "idle",
    error: null
}

export const getDoneData = createAsyncThunk("done/fetchDone", async () => {

    const res = await axios.get("http://localhost:5000/done");
    return res.data;

});

export const addDoneData = createAsyncThunk("done/addDone", async (text) => {
    const res = await axios.post("http://localhost:5000/done", { done_text: text });
    console.log(res);
    return res.data;
});

export const deleteDoneData = createAsyncThunk("done/deleteDone", async (id) => {
    const res = await axios.delete(`http://localhost:5000/done/${id}`);
    return id;
});

export const doneSlice = createSlice({
    name: 'done',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getDoneData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDoneData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.doneText = action.payload;
            });

        builder.addCase(addDoneData.pending, (state) => {
            state.status = "loading";
        }).addCase(addDoneData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.doneText.push(action.payload);
        });

        builder.addCase(deleteDoneData.pending, (state) => {
            state.status = "loading";
        }).addCase(deleteDoneData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.doneText = state.doneText.filter((done) => done.done_id !== action.payload);
        });
    }
});

// this is for dispatch
export const { } = doneSlice.actions;

// this is for configureStore
export default doneSlice.reducer;
