-- Drop and recreate stories table (Example)
DROP TABLE IF EXISTS stories CASCADE;

DROP TYPE IF EXISTS story_status;
CREATE TYPE story_status AS ENUM ('complete', 'open', 'closed');

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  text TEXT,
  status story_status DEFAULT 'open'
);
