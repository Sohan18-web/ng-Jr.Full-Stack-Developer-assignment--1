import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './TaskService';

function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');


  //Display Task List
  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //Add new task
  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask(title);
    setTitle('');
    fetchTasks();
  };

  //Update existing task by id
  const handleUpdate = async (task) => {
    await updateTask({ ...task, completed: !task.completed });
    fetchTasks();
  };

  //Delete existing task by id
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleUpdate(task)}>{task.completed ? 'Undo' : 'Complete'}</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;