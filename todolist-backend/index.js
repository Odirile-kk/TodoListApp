const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let users = [];

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    const newUser = { email, password };
    users.push(newUser);
    res.status(200).json({ message: 'User registered successfully' });
  }
});

app.get('/register', (req, res) => {
    res.send(users);
})

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((user) => user.email === email && user.password === password);
  if (existingUser) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
