import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Switch, ProtectedRoute } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegistration = () => {
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route>
      <Route path='/register'element={<Register handleRegistration={handleRegistration}/>} ></Route>
        <Route path='/todolist' element={<TodoList />} > </Route>
        <Route path='/' element={<Login handleLogin={handleLogin}/>}/>
      </Route>
    </Routes>
   
    </BrowserRouter>
  );
}
 

export default App;
