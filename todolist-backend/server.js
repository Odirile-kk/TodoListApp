const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(cors());

let tasks = [
    {
        
      }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newtask = {
    id: Date.now(),
    task: req.body.task,
    date: req.body.date,
    priority: req.body.priority,
    completed: req.body.completed,
  };
  tasks.push(newtask);
  res.status(201).json(newtask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedtask = {
    id: taskId,
    task: req.body.task,
    date: req.body.date,
    priority: req.body.priority,
    completed: req.body.completed,
  };
  tasks = tasks.map(task => (task.id === taskId ? updatedtask : task));
  res.json(updatedtask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
