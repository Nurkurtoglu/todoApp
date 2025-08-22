import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "./slices/todoSlice.jsx";
import inprogressReducer from "./slices/inprogressSlice.jsx";
import doneReducer from "./slices/doneSlice.jsx"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        inprogress: inprogressReducer,
        done: doneReducer,
    },
});

