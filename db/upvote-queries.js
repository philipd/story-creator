const db = require('./db');

const vote = (user_id, contribution_id) => {
  return db.query(`
    INSERT INTO upvotes (user_id, contribution_id) VALUES($1, $2)
      ON CONFLICT (user_id, contribution_id) DO UPDATE SET active = NOT upvotes.active;
  `, [user_id, contribution_id])
  .then(response => {
    return db.query(`
    SELECT COUNT(*) from upvotes where contribution_id = $1 and active = true;
  `,[contribution_id]);
  })
  .then(response => {
    console.log(response.rows);
    return response.rows;
  });
};

module.exports = {
  vote
};
