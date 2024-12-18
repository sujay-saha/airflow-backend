const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addTaskToList(tasks, taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

function getTasks(tasks) {
  let result = tasks;
  return tasks;
}

function sortTasksByPriority(tasks) {
  let result = tasks.sort((task1, task2) => {
    return task1.priority - task2.priority;
  });
  return result;
}

function editPriorityByTaskId(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}

function editTextyByTaskId(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}

function deleteTaskById(tasks, taskId) {
  let result = tasks.filter((task) => task.taskId != taskId);
  return result;
}

function filterTaskByPriority(tasks, priority) {
  let result = tasks.filter((task) => task.priority === priority);
  return result;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  res.json(addTaskToList(tasks, taskId, text, priority));
});

app.get('/tasks', (req, res) => {
  res.json(getTasks(tasks));
});

app.get('/tasks/sort-by-priority', (req, res) => {
  res.json(sortTasksByPriority(tasks));
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  res.json(editPriorityByTaskId(tasks, taskId, priority));
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  res.json(editTextyByTaskId(tasks, taskId, text));
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  res.json(deleteTaskById(tasks, taskId));
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  res.json(filterTaskByPriority(tasks, priority));
});

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
