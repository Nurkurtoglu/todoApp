
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


const initialState = {
    todoText: [],
    status: "idle",
    error: null
}

export const getTodosData = createAsyncThunk("todos/fetchTodos", async () => {

    const res = await axios.get("http://localhost:5000/todo");
    return res.data;

});

export const addTodoData = createAsyncThunk("todos/addTodos", async (text) => {
    const res = await axios.post("http://localhost:5000/todo", text);
    console.log(res);
    return res.data;
});

export const deleteTodoData = createAsyncThunk("todo/deleteTodos", async (id) => {
    const res = await axios.delete(`http://localhost:5000/todo/${id}`);
    return id;
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTodosData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todoText = action.payload;
            });

        builder.addCase(addTodoData.pending, (state) => {
            state.status = "loading";
        }).addCase(addTodoData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.todoText.push(action.payload);
        });

        builder.addCase(deleteTodoData.pending, (state) => {
            state.status = "loading";
        }).addCase(deleteTodoData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.todoText = state.todoText.filter((todo) => todo.todo_id !== action.payload);
        });
    }
});

// this is for dispatch
export const { } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;
