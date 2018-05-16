module.exports = (webserver, dataBase, mysql, session) => {
  webserver.post("/api/signup", (req, res) => {
    const output = {
      success: false,
      data: [],
      errors: []
    };

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    let query = `SELECT email, username FROM users WHERE email = ? AND username = ?`;
    let inserts = [email, username];

    let selectSqlQuery = mysql.format(query, inserts);

    dataBase.query(selectSqlQuery, (error, data, fields) => {
      if (data === []) {
          console.log('data is empty');
          query = `INSERT INTO users (user_id, email, username, password, google_id, facebook_id, status) VALUES (NULL, ?, ?, ?, '', '', 'active')`;
          inserts = [email, username, password];

          sqlQuery = mysql.format(query, inserts);

          dataBase.query(sqlQuery, (error, data, fields) => {
              if (!error) {
                  output.success = true;
                  output.data = data;
                  req.session.user_id = pullUserId(username);
                console.log(pullUserId(username));
                  res.redirect("/create_profile");
              } else {
                  output.errors = error;
              }
              res.json(output);
          });
      } else {
          console.log('user already exists');
          res.send("User already exists");
      }
    });
  });

  function pullUserId(username) {
    let query = `SELECT user_id FROM users WHERE username = ${username}`;
    dataBase.query(query, (error, data, fields) => {
      if (!error) {
        return data[0].user_id;
      } else {
        return "User doesn't exist";
      }
    });
  }
};
