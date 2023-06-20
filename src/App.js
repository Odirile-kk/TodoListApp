import './App.css';
//import { useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
  
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
        <Route path='/todolist' element={<TodoList />} > </Route>
        <Route path='/' element={<Register />}/>
    </Routes>
   
    
  );
}
 

export default App;
