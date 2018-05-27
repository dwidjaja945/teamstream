module.exports = function (webserver, dataBase, mysql) {
    webserver.get('/api/roster', function (req, res) {
        const output = {
            success: false,
            athletes: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = '/login_page';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        }

        let teamID;
        if (req.body && req.body.id) {
            teamID = req.body.id;
        }
        else{
            teamID = req.session.team_id;
        }
        console.log('roster team id: ', teamID);
        // let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = [teamID];

        let query = "SELECT athlete_info.first_name, athlete_info.last_name, athletes.team_id, athletes.user_level " +
            "FROM athlete_info " +
            "JOIN athletes " +
            "ON athlete_info.athlete_info_id = athletes.athlete_info_id " +
            "JOIN teams " +
            "ON teams.team_id = athletes.team_id " +
            "WHERE teams.team_id = ?";

        let sqlQuery = mysql.format(query, inserts);

        dataBase.query(sqlQuery, function (error, data, fields) {
            if (!error) {
                output.success = true;
                output.athletes = data;
                output.redirect = '/roster';
            } else {
                output.errors = error
            }
            res.json(output);
        });
    });
};