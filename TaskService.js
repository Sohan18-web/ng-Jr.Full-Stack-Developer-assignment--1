const express = require('express');
const mysql = require('mysql2');
var bp=require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1802',
  database: 'enzigma'
});


db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

app.get('/api/tasks', (req, res) => {
  const taskId=req.body.id;
  db.query('SELECT * FROM tasks',[taskId], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

app.post('/api/task', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, false], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, title, completed: false });
  });
});

app.put('/api/task/:id', (req, res) => {
  const { title, completed } = req.body;
  db.query('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, req.params.id], (err) => {
    if (err) throw err;
    res.json({ id: req.params.id, title, completed });
  });
});

app.delete('/api/task/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.status(204).send();
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));