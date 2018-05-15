module.exports = function(webserver, dataBase, mysql) {
  webserver.get("/api/bulletin_board", function(req, res) {
    let user_id;
    const output = {
      success: false,
      data: [],
      errors: []
    };

    let teamID = null;
    if (req.session !== undefined) {
      user_id = req.session.user_id;
      console.log("user_id: " , user_id);
    } else {
      res.redirect("/login");
    }
    teamID = 1;
    if (req.body && req.body.id) {
      //   teamID = req.body.id;
      // will need to rework to pull ID from sessions
    }
    let athlete_info_id_query = `SELECT athlete_info.first_name, athlete_info.last_name, inner_table.post_text, inner_table.timestamp
            FROM (SELECT post_text, bulletin.athlete_id AS b_a_id, bulletin.timestamp, bulletin.team_id
            FROM bulletin
            JOIN athletes
                ON bulletin.athlete_id = athletes.athlete_id) AS inner_table
            JOIN athlete_info
                ON athlete_info.athlete_info_id = inner_table.b_a_id
            WHERE team_id = ${teamID}
            ORDER BY timestamp ASC`;

    let inserts = [""];
    // Will be inserting team_id

    let sqlQuery = mysql.format(query, inserts);

    dataBase.query(sqlQuery, function(error, data, fields) {
      if (!error) {
        output.success = true;
        output.data = data;
      } else {
        output.errors = error;
      }
      res.json(output);
    });
  });

  webserver.post("/api/bulletin_board", (req, res) => {
    const output = {
      success: false,
      data: [],
      errors: []
    };

    if (req.body) {
      if (req.body.athlete_id) {
        var athlete_id = req.body.athlete_id;
        // will need to rework to pull ID from sessions
      }
      if (req.body.post_text) {
        var post_text = req.body.post_text;
        // assign bulletin post here
      }
      if (req.body.team_id) {
        var team_id = req.body.team_id;
        // assign team name here
      }
      if (req.body.pinned) {
        var pinned = req.body.pinned;
      }
    } else {
      res.send("Missing Proper query items");
    }

    let query =
      "INSERT INTO " +
      "`bulletin` (`post_id`, ??, ??, `timestamp`, ??, ??) " +
      "VALUES (NULL, ?, ?, NOW(), ?, ?)";

    let inserts = [
      "post_text",
      "athlete_id",
      "team_id",
      "pinned",
      post_text,
      athlete_id,
      team_id,
      pinned
    ];
    // will be inserting post_text, athlete_id, team_id, pinned

    let sqlQuery = mysql.format(query, inserts);

    dataBase.query(sqlQuery, function(error, data, fields) {
      if (!error) {
        output.success = true;
        output.data = data;
      } else {
        output.errors = error;
      }
      res.json(output);
    });
  });

  webserver.delete("/api/bulletin_board", (req, res) => {
    const output = {
      success: false,
      data: [],
      errors: []
    };

    if (req.body) {
      if (req.body.post_id) {
        var post_id = req.body.post_id;
      }
      if (req.body.athlete_id) {
        var athlete_id = req.body.athlete_id;
      }
    }

    let query =
      "DELETE FROM `bulletin` WHERE `bulletin`.`post_id` = ? AND `bulletin`.`athlete_id` = ?";
    let inserts = [post_id, athlete_id];
    // insert post_id and athlete_id

    let sqlQuery = mysql.format(query, inserts);

    dataBase.query(sqlQuery, (error, data, fields) => {
      if (!error) {
        output.success = true;
        output.data = data;
      } else {
        output.errors = error;
      }
      res.json(output);
    });
  });
};
