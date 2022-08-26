const express = require("express");
const {
    createTasks,
    getTasks,
    getSingleTasks,
    deleteTasks,
    UpdateTasks
} = require("../controllers/taskController");
const routerTask = express.Router();

//Get all Task
routerTask.get('/', getTasks);

//Get a single Task
routerTask.get('/:id', getSingleTasks);

//Post a new Task
routerTask.post('/', createTasks);

//Delete a Task
routerTask.delete('/:id', deleteTasks);

//Update a Task
routerTask.patch('/:id', UpdateTasks);

module.exports = routerTask;