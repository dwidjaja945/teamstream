module.exports = function(webserver, dataBase, mysql) {
  webserver.get("/api/bulletin_board", function(req, res) {
    user_id = req.session.user_id;
    team_id = req.session.team_id;
    athlete_id = req.session.athlete_id;
    athlete_info_id = req.session.athlete_info_id;
    const output = {
      success: false,
      data: [],
      errors: []
    };

    console.log('req.session: ', req.session);
    
    let teamID = null;
    if (req.session.user_id === undefined) {
      res.redirect("/login");
    }

    // Get athlete_id from user_id
    let athlete_info_id_query = `SELECT athlete_info_id
      FROM athlete_info
      WHERE user_id = ?`

    let athlete_info_id_inserts = [user_id];

    let athlete_info_id_sqlQuery = mysql.format(athlete_info_id_query, athlete_info_id_inserts);

    //Get the team_id(s) from user_id
    dataBase.query(athlete_info_id_sqlQuery, function(error, data, fields) {
      if (!error) {
        // let athlete_info_id = data[0].athlete_info_id;
        // req.session.athlete_info_id = athlete_info_id;

        let team_id_query = `SELECT athletes.team_id
          FROM athletes
          WHERE athlete_info_id = ?`

        let team_id_inserts = [athlete_info_id];

        let team_id_sqlQuery = mysql.format(team_id_query, team_id_inserts);

        // Get bulletinBoard information from team_id
        dataBase.query(team_id_sqlQuery, ( error, data, fields) => {
          if (!error) {
            output.data = data;
            console.log("output data: " , output.data);
            let bulletinBoardQuery = ``;
          }
        })
      } else {
        output.errors = error;
      }
      
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
