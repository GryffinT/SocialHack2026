CREATE TABLE IF NOT EXISTS tasks (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  desc        TEXT NOT NULL,
  mode        INTEGER NOT NULL,
  importance  INTEGER NOT NULL,
  created_at  TEXT NOT NULL,
  buddies     TEXT NOT NULL,
  embedding   FLOAT NOT NULL DEFAULT 0.0
);
