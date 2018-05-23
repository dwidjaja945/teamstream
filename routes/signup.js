module.exports = (webserver, dataBase, mysql, encrypt) => {
  webserver.post("/api/signup", (req, res) => {
    const output = { success: false, data: [], errors: [], redirect: "" };

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    //========================
    // Password Encryption ===
    //========================

    encrypt.hash(password, encrypt.saltRounds, (err, hash) => {
      password = hash;

      // ======================
      // Finishing Query ======
      // ======================
      let query = `SELECT email, username FROM users WHERE email = ? AND username = ?`;
      let inserts = [email, username];

      let selectSqlQuery = mysql.format(query, inserts);

      dataBase.query(selectSqlQuery, (error, data, fields) => {
        if (data.length === 0) {
          console.log("data is empty");
          query = `INSERT INTO users (user_id, email, username, password, google_id, facebook_id, status) VALUES (NULL, ?, ?, ?, '', '', 'active')`;
          inserts = [email, username, password];

          let sqlQuery = mysql.format(query, inserts);

          dataBase.query(sqlQuery, (error, data, fields) => {
            if (!error) {
              output.success = true;
              output.data = data;
              req.session.user_id = data.data.insertId;
              output.redirect = "/create_athlete";
              pullUserId(username, output, req, res);
            } else {
              output.errors = error;
              res.json(output);
            }
          });
        } else {
          console.log("user already exists");
          res.send("User already exists");
        }
      });
    });
  });
  function pullUserId(username, output, req, res) {
    let query = `SELECT user_id FROM users WHERE username = ?`;
    let inserts = [username];
    let mysqlQuery = mysql.format(query, inserts);
    dataBase.query(mysqlQuery, (error, data, fields) => {
      if (!error) {
        req.session.user_id = data[0].user_id;
      } else {
        output.error.message = "User doesn't exist";
      }
      res.json(output);
    });
  }
};
