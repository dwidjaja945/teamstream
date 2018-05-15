module.exports = function(webserver, dataBase, mysql, session) {
  webserver.post("/api/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const output = {
      success: false,
      data: [],
      errors: []
    };

    let query = `SELECT 
      users.user_id, 
      athlete_info.first_name, 
      athlete_info.last_name, 
      athlete_info.athlete_info_id, 
      athletes.team_id
      FROM users
      JOIN athlete_info
        ON users.user_id = athlete_info.user_id
      JOIN athletes
        ON athlete_info.athlete_info_id = athletes.athlete_info_id
      WHERE username = ? 
      AND password = ?`;

    let inserts = [username, password];

    let sqlQuery = mysql.format(query, inserts);

    dataBase.query(sqlQuery, (error, data, fields) => {
      if(!error) {
        output.success = true;
        output.data = data;
        req.session.user_id = data[0].user_id;
        // res.redirect('/bulletin_board');
        // send back json data about path they should go to (bulletinboard) => browser history
      } else {
        output.errors = error;
      }
      res.json(output);
    });

  });

};