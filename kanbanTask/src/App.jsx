import { useState } from 'react'
import './App.css'
import TodoCard from './components/TodoCard';
import InprogressCard from './components/InprogressCard';
import DoneCard from './components/DoneCard';
import { Grid } from '@mui/material';

function App() {


  return (
    <div className="app">
      <h1 className="app-title">Görev Panom</h1>

      <Grid container spacing={2} justifyContent="center">
        {/* xs=12 => küçük ekranda tam genişlik 
            md=4 => orta ve büyük ekranlarda 3 sütun yapısı */}
        <Grid item xs={12} md={4}>
          <TodoCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <InprogressCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <DoneCard />
        </Grid>
      </Grid>

    </div>
  );
}

export default App
