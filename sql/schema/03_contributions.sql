DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id),
  user_id INTEGER REFERENCES users(id),
  chapter_number INTEGER,
  accepted boolean DEFAULT false,
  ctext TEXT
)
