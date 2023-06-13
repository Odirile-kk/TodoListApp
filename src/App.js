import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path='/' element={<Register/>}/></Route>
        <Route path='/login' element={<Login />} > </Route>
        <Route path='/register'element={<Register />} ></Route>
        <Route path='/todolist'element={<TodoList />} >
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
