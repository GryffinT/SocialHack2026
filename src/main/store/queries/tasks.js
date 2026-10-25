'use strict';

//import path from 'node:path';
//import { randomUUID } from 'node:crypto';
const path = require('path');
const { randomUUID } = require('node:crypto');
const { db } = require(path.join(__dirname,  '..', 'database.js'));
const { embedText, cosineSimilarity } = require(path.join(__dirname, '..', '..', 'similarityEngine', 'embeddings.js'));

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

const findBuddies = (score) => {

  const tasks = listTasks();
  const buddies = [];

  for (const task of tasks) {
    const buds = JSON.parse(task.buddies);

    if (buds.length >= 3) continue;

    const simScore = cosineSimilarity(score, JSON.parse(task.embedding));

    buddies.push({
      id: task.id,
      score: simScore,
    });
  }

  buddies.sort((a, b) => b.score - a.score);

  return buddies.slice(0, 3);
};

const createTask = async (data) => {

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

    const embedRes = await embedText(data.name);
    const buddiesTemp = findBuddies(embedRes);
    console.log(buddiesTemp);

    // shape
    const id = randomUUID(),
          name = data.name,
          desc = data.desc ?? '', // empty string to avoid typeerror in front end
          mode = data.mode,
          importance = data.importance,
          created_at = new Date().toISOString(), // ISO: YYYY-MM-DDTHH:mm:ss.sssZ
          buddies = JSON.stringify(buddiesTemp), // WARNING: PLACEHOLDER
          embed = JSON.stringify(embedRes);

    db.prepare(`
      INSERT INTO tasks (id, name, desc, mode, importance, created_at, buddies, embedding)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, desc, mode, importance, created_at, buddies, embed);

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

// Takes a node ID
const deleteTask = (data) => {
  
  if (!data) {
    console.error(`[deleteTask] MISSING ID ERROR:`, data);
    return -1;
  }

  try {

    const deleteTaskTransaction = db.transaction((taskId) => {
      db.prepare(`
        UPDATE tasks
        SET buddies = (
          SELECT json_group_array(
            json_object('id', json_extract(buddy.value, '$.id'),
                        'score', json_extract(buddy.value, '$.score'))
          )
          FROM json_each(tasks.buddies) AS buddy
          WHERE json_extract(buddy.value, '$.id') != ?
        )
        WHERE id != ?
          AND EXISTS (
            SELECT 1
            FROM json_each(tasks.buddies) AS buddy
            WHERE json_extract(buddy.value, '$.id') = ?
          );
      `).run(taskId, taskId, taskId);

      return db.prepare(`DELETE FROM tasks WHERE id = ?`).run(taskId);
    });

    const res = deleteTaskTransaction(data);

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
