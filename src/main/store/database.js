'use strict';

const { app } = require('electron');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs') // filesys reader

const userPath = app.getPath('userData') // user Data path

const db = new Database(path.join(userPath, 'socialHack.db')) // create db in userdata

const runMigrations = () => {

  try {

    // Create the migrations table for records
    db.exec(`

      CREATE TABLE IF NOT EXISTS migrations (
        name TEXT PRIMARY KEY,
        run_at TEXT NOT NULL
      )

    `)

    // grab and sort all sql files in the migrations directory 
    const migsInDir = fs.readdirSync(path.join(__dirname, 'migrations')).filter(f => f.endsWith('.sql')).sort();

    for ( let mig of migsInDir ) {

      const alreadyRun = db.prepare(`SELECT name FROM migrations WHERE name = ?`).get(mig);

      if ( !alreadyRun ) {

        const sql = fs.readFileSync(path.join(__dirname, 'migrations', mig), "utf8");
        db.exec(sql);

        db.prepare(`INSERT INTO migrations (name, run_at) VALUES (?, ?)`).run(mig, new Date().toISOString());


      }

    }

  } catch (err) {

    console.error(`RUN MIGRATIONS ERROR:`, err);

  }

}

runMigrations();

module.exports = { db };
