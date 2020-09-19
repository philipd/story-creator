-- Drop and recreate stories table (Example)
DROP TABLE IF EXISTS stories;

DROP TYPE IF EXISTS story_status;
CREATE TYPE story_status AS ENUM ('complete', 'open', 'pending');

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  status story_status DEFAULT 'open'
);
