module.exports = function(webserver, dataBase, mysql) {
  webserver.get("/bulletin_board", function(req, res) {
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

    let inserts = [''];

    let sqlQuery = mysql.format(query, inserts);

      dataBase.query(sqlQuery, function(error, data, fields) {
        if(!error) {
            output.success = true;
            output.data = data;
        } else {
            output.errors = error;
        }
        console.log(output);
        res.json(output);
    });
  });
};
