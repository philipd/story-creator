-- Drop and recreate stories table (Example)
DROP TABLE IF EXISTS stories;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  status ENUM ('complete', 'open', 'pending')
);
