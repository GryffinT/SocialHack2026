BEGIN TRANSACTION;

CREATE TABLE tasks_new (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  desc        TEXT NOT NULL,
  mode        INTEGER NOT NULL,
  importance  INTEGER NOT NULL,
  created_at  TEXT NOT NULL,
  buddies     TEXT NOT NULL DEFAULT '[]',
  embedding   TEXT
);

INSERT INTO tasks_new (
  id, name, desc, mode, importance, created_at, buddies, embedding
)
SELECT
  id, name, desc, mode, importance, created_at,
  CASE
    WHEN buddy IS NULL THEN '[]'
    ELSE json_array(buddy)
  END,
  embedding
FROM tasks;

DROP TABLE tasks;

ALTER TABLE tasks_new RENAME TO tasks;

COMMIT;

