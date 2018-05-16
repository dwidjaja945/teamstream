module.exports = function(webserver, dataBase, mysql, session) {
  webserver.post("/api/login", (req, res) => {
    let username;
    let password;
    if (req.body.username === "" || req.body.password === "") {
      res.send("Please provide login credentials");
      res.end();
      return;
    } else {
      username = req.body.username;
      password = req.body.password;
    }

    const output = {
      success: false,
      data: [],
      errors: []
    };

    let query = `SELECT 
      users.user_id, 
      athlete_info.athlete_info_id, 
      athletes.team_id,
      athletes.athlete_id,
      athlete_info.first_name, 
      athlete_info.last_name
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
      if (!error) {
        console.log("req.session: ", req.session);
        output.success = true;
        output.data = data;
        console.log(data);
        req.session.user_id = data[0].user_id;
        req.session.team_id = data[0].team_id;
        req.session.athlete_id = data[0].athlete_id;
        req.session.athlete_info_id = data[0].athlete_info_id;
        // res.redirect('/bulletin_board');
        // send back json data about path they should go to (bulletinboard) => browser history
      } else {
        output.errors = error;
      }
      res.json(output);
    });
  });
};
