import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, deleteTask, updateTask } from './tasksSlice';
import { toggleTaskCompletion } from './tasksSlice';

function TodoList( {task}) {
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [priority, setPriority] = useState('High');

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    if (newTask && newDate) {
      dispatch(addTask({ 
        task: newTask, 
        date: newDate,
        priority: priority,
        completed: false
        }))
        .then(() => {
          setNewTask('');
          setNewDate('');
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setNewTask(task.task);
    setNewDate(task.date);
  };

  const handleUpdateTask = () => {
    if (newTask && newDate && editingTask) {
      const updatedTask = { id: editingTask, task: newTask, date: newDate };
      dispatch(updateTask(updatedTask))
        .unwrap()
        .then(() => {
          setEditingTask(null);
          setNewTask('');
          setNewDate('');
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    }
  };

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
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
      
      {!editingTask ? (
          <button class="btn btn-primary" onClick={handleAddTask} ><i class="bi bi-file-earmark-plus"></i></button>
        ) : (
          <button className="btn btn-success" onClick={handleUpdateTask}><i class="bi bi-check-lg"></i></button>
        )}
         <Link to={'/'} className="btn btn-danger" ><i class="bi bi-x-square"></i></Link>
        </div>
        <div className='container-tasks'>
      <ul className='list-task'>
        {tasks.map((task) => (
          <li key={task.id} 
          style={{
            color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'yellow',
            textDecoration: task.completed ? 'line-through' : 'none'}}>
                <div><span>{task.task}</span></div>
                <div><span>{task.date}</span></div>

            <button className="btn btn-primary" onClick={() => handleEditTask(task)}><i class="bi bi-pen"></i></button>
            <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}><i class="bi bi-trash"></i></button>
            
              <button class="btn btn-success" onClick={() => handleToggleCompletion(task.id)}><i class="bi bi-check-lg"></i></button>
           
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}


export default TodoList;
