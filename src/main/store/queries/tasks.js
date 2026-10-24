'use strict';

//import path from 'node:path';
//import { randomUUID } from 'node:crypto';
const path = require('path');
const { randomUUID } = require('node:crypto');
const { db } = require(path.join(__dirname,  '..', 'database.js'));

// I could do disallowed fields but this is just a demo -\O/-

// getTask, deleteTask, updateTask, listTasks

const listTasks = () => {

  try {

    // Grab all tasks from the task table
    const tasks = db.prepare(`SELECT * FROM tasks`).all();
    
    // return tasks if successful
    return tasks;

  } catch (err) {

    console.error('[listTasks] ERROR:', err);
    return -1; // fail w/error

  }

}

const createTask = (data) => {

  if (!data || data == null) {
    console.error(`[createTask] INVALID DATA ERROR`);
    return -1;
  }

  try {

    // name, importance (color), mode (integrated (1) || manual (0) ) <- !boolean incase other modes later
    if ( !(data.name && data.importance && data.mode != null) ) {
      // if call is ill-formed return early w/error -1
      console.error(`[createTask] MISSING PARAMETER ERROR:`, JSON.stringify(data, null, 2));
      return -1;

    }

    // shape
    const id = randomUUID(),
          name = data.name,
          desc = data.desc ?? '', // empty string to avoid typeerror in front end
          mode = data.mode,
          importance = data.importance,
          created_at = new Date().toISOString(), // ISO: YYYY-MM-DDTHH:mm:ss.sssZ
          buddy = null; // WARNING: PLACEHOLDER 

    db.prepare(`
      INSERT INTO tasks (id, name, desc, mode, importance, created_at, buddy)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, desc, mode, importance, created_at, buddy);

    return id; // return ID if success!

  } catch (err) {
    console.error(`[createTask] ERROR:`, err);
    return -1;
  }

}

const getTask = (data) => {

  if (!data) {
    console.error(`[getTask] MISSING PARAMETER ERROR:`, data);
    return -1;
  } 

  try {

    const task = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(data);

    return task;

  } catch (err) {

    console.error(`[getTask] ERROR:`, err);
    return -1;

  }

}

// takes a node ID
const deleteTask = (data) => {

  if ( !data || data == null ) {
    console.error(`[deleteTask] MISSING ID ERROR:`, data);
    return -1;
  }

  try {

    res = db.prepare(`DELETE FROM tasks WHERE id = ?`).run(data);

    if (res.changes === 0) {
      console.warn(`[deleteTask] TASK NOT FOUND`, data);
      return -1;
    } 

    return data; 

  } catch (err) {
    console.error(`[deleteTask] ERROR`, err);
    return -1;
  }

};

module.exports = {
  createTask,
  deleteTask,
  listTasks,
  getTask
};
