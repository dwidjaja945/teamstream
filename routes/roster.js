module.exports = function (webserver, dataBase, mysql) {
    webserver.get('/roster', function (req, res) {

        let teamID;
        if (req.body && req.body.id) {
            teamID = req.body.id;
        }
        // let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['athlete_profile', 'id', teamID];

        let query = "SELECT athlete_info.first_name, athlete_info.last_name, athletes.team_id, athletes.user_level " +
            "FROM athlete_info " +
            "JOIN athletes " +
            "ON athlete_info.athlete_info_id = athletes.athlete_info_id " +
            "JOIN teams " +
            "ON teams.team_id = athletes.team_id " +
            "WHERE teams.team_id = '1'";

        let sqlQuery = mysql.format(query, inserts);

        const output = {
            success: false,
            athletes: [],
            errors: []
        };

        dataBase.query(query, function (error, data, fields) {
            if (!error) {
                output.success = true;
                output.athletes = data;
            } else {
                output.errors = error
            }
            res.json(output);
        });
    });
}