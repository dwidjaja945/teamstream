module.exports = function(webserver, dataBase, mysql) {
  webserver.get("/api/bulletin_board", function(req, res) {
    const output = {
      success: false,
      data: [],
      errors: []
    };

    let teamID = 1;
    if (req.body && req.body.id) {
      //   teamID = req.body.id;
      // will need to rework to pull ID from sessions
    }
    let query = `SELECT athlete_info.first_name, athlete_info.last_name, inner_table.post_text, inner_table.timestamp
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
    res.send('request successful. Data: ', req);
    return;
    const output = {
      success: false,
      data: [],
      errors: []
    };
    let team_id = 1;
    let post_text = "test text post post post here here";
    let first_name = "bob";
    let last_name = "smith";
    let timestamp = "3:00";
    if (req.body) {
      if (req.body.id) {
        // will need to rework to pull ID from sessions
      }
      if (req.body.post_text) {
        // assign bulletin post here
      }
      if (req.body.first_name) {
        // assign first name here
      }
      if (req.body.last_name) {
        // assign last name here
      }
      if (req.body.timestamp) {
        // assign timestamp here
      }
      if (req.body.team_name) {
        // assign team name here
      }
    }

    let query =
      "INSERT INTO " +
      "`bulletin` (`post_id`, `post_text`, `athlete_id`, `timestamp`, `team_id`, `pinned`)" +
      "VALUES (NULL, 'Hope everything is ok!', '3', NOW(), '1', '0')";

    let inserts = [""];
    // will be inserting post_text, athlete_id, team_id

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
};
