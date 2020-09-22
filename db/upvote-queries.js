const db = require('./db');
const vote = (user_id, contribution_id) => {
  return db.query(`
    CASE
      WHEN EXISTS (SELECT * FROM upvotes WHERE user_id = $1 AND contribution_id = $2)
        THEN INSERT INTO upvotes (user_id, contribution_id) VALUES ($1, $2);
      ELSE
        UPDATE upvotes SET active = NOT active WHERE user_id = $1 AND contribution_id = $2;
    END
  `, [user_id, contribution_id])
    .then((response) => {
      console.log(response.rows);
      return response.rows[0];
    });
};

module.exports = {
  vote
};
