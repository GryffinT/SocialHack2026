'use strict';

const path = require('path');
const { ipcMain } = require('electron');
// Get the task functions from their directory. (actual implementations)
// WARNING: SET DIRECTORY, DONT FORGET!
const { createTask, deleteTask, updateTask, listTasks, getTask } = require(path.join(__dirname, "..", "..", "store", "queries", "tasks.js" ));

const registerTaskHandlers = () => {

  ipcMain.handle('tasks:create', async (event, data) => { // create task handler to be exposed later and link to func

    const newID = createTask(data); // Call the function and pass it the data from call-site
    return newID; // return the new task's ID, -1 if fail 

  })

  ipcMain.handle('tasks:delete', async ( event, data ) => {

    const deletedID = deleteTask(data);
    return deletedID; // returns the deleted ID for use later, -1 if fail

  })

  ipcMain.handle('tasks:update', async (event, data) => {
  
    const updatedID = updateTask(data);
    return updatedID; // -1 if fail

  })

  ipcMain.handle('tasks:get', async (event, data) => {

    const task = getTask(data); // pass in the task ID, returns data
    return task;

  })

  ipcMain.handle('tasks:list', async (event) => {

    const tasks = listTasks();
    return tasks;

  })

};

module.exports = { registerTaskHandlers } // used in the handler.js file
