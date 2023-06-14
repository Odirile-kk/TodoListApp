import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editTaskId, setEditTaskId] = useState('');
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskDate, setEditTaskDate] = useState('');
  const [priority, setPriority] = useState('High');

  const [loggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  //function to create the task and store it in the json server
  const createTask = async () => {
    if (newTask && newDate) {
      try {
        const response = await axios.post('http://localhost:3001/tasks', {
          task: newTask,
          date: newDate,
          priority: priority,
          completed: false,
        });
        setTasks([...tasks, response.data]);
        setNewTask('');
        setNewDate('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  //function to delete the task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

 
  const handleEditTask = async (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.task);
    setEditTaskDate(task.date);
  };

  const saveEditedTask = async () => {
    if (editTaskText && editTaskDate) {
      try {
        await axios.put(`http://localhost:3001/tasks/${editTaskId}`, {
          task: editTaskText,
          date: editTaskDate,
        });
        const updatedTasks = tasks.map((task) =>
          task.id === editTaskId ? { ...task, task: editTaskText, date: editTaskDate } : task
        );
        setTasks(updatedTasks);
        setEditTaskId('');
        setEditTaskText('');
        setEditTaskDate('');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId('');
    setEditTaskText('');
    setEditTaskDate('');
  };

  const markTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  
  const handleLogout = () => {
    setLoggedIn(false);
    nav('/');
  };

  return (
    <div className='container-list'>
      <h1>TODO LIST</h1>
      <div className='list'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button class="btn btn-primary" onClick={createTask} ><i class="bi bi-file-earmark-plus"></i></button>
       <button onClick={handleLogout}>Logout</button>
      </div>


        <div className='container-tasks'>
      <ul className='list-task'>
        {tasks.map((task) => (
          <li key={task.id} 
          style={{
            color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'yellow',
            textDecoration: task.completed ? 'line-through' : 'none'}}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <input
                  type="date"
                  value={editTaskDate}
                  onChange={(e) => setEditTaskDate(e.target.value)}
                />
                <button class="btn btn-success" onClick={saveEditedTask}><i class="bi bi-check"></i></button>
                <button class="btn btn-danger" onClick={handleCancelEdit}><i class="bi bi-x"></i></button>
              </>
            ) : (
              <>
                <div><span>{task.task}</span></div>
                <div><span>{task.date}</span></div>
                {!task.completed && (
              <button class="btn btn-success" onClick={() => markTaskComplete(task.id)}><i class="bi bi-check-lg"></i></button>
            )}
                <button class="btn btn-primary" onClick={() => handleEditTask(task)}><i class="bi bi-pen"></i></button>
                <button class="btn btn-danger" onClick={() => deleteTask(task.id)}><i class="bi bi-trash3"></i></button>
              </>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default TodoList;
