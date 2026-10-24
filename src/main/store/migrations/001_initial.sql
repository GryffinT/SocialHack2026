CREATE TABLE IF NOT EXISTS tasks (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  desc        TEXT NOT NULL,
  mode        INTEGER NOT NULL,
  importance  INTEGER NOT NULL,
  created_at  TEXT NOT NULL,
  buddy       TEXT REFERENCES tasks(id)
);
