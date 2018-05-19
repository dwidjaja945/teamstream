module.exports = function(webserver, dataBase, mysql, session) {

  webserver.post("/api/login", (req, res) => {
    let username;
    let password;
    if (req.body.username === "" || req.body.password === "") {
      output.redirect("/login")
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
      errors: [],
      redirect: ''
    };

        let query = `SELECT 
      users.user_id, 
      athlete_info.athlete_info_id, 
      athletes.team_id,
      athletes.athlete_id,
      athlete_info.first_name, 
      athlete_info.last_name,
      teams.team_code
      FROM users
      JOIN athlete_info
        ON users.user_id = athlete_info.user_id
      JOIN athletes
        ON athlete_info.athlete_info_id = athletes.athlete_info_id
      JOIN teams
        ON athletes.team_id = teams.team_id
      WHERE username = ? 
      AND password = ?`;

        let inserts = [username, password];

    let sqlQuery = mysql.format(query, inserts);

    dataBase.query(sqlQuery, (error, data, fields) => {
      if (!error) {
        // tried to go to page without logging in
        if (data.length === 0) {
          output.redirect('/login');
          output.errors = "Invalid Login Credentials";
          res.json(output);
          return;
        }

        // providing data if user logged in
        output.success = true;
        output.data = data;
        output.redirect = '/bulletin-board'

        // setting session data
        req.session.user_id = data[0].user_id;
        req.session.team_id = data[0].team_id;
        req.session.athlete_id = data[0].athlete_id;
        req.session.athlete_info_id = data[0].athlete_info_id;
        req.session.team_code = data[0].team_code;
        console.log('req.session: ***** ' , req.session);
        // send back json data about path they should go to (bulletinboard) => browser history
      } else {
        output.errors = error;
      }
      res.json(output);
    });
};
