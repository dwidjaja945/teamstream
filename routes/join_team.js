const slashes = require('slashes');
const asyncMiddleware = require("../middleware/async");
module.exports = (webserver, dataBase, mysql) => {
    /**
     * Takes:
     *      team_code: ####
     *
     * Returns:
     *      success: true
     *      team_id: ####
     */

    // ================================
    // ======== Joining a Team ========
    // ================================
    webserver.post("/api/join_team", asyncMiddleware((req, res) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ""
        };

        let user_id;
        if (req.session.user_id === undefined) {
            // console.log('undefined user... Kicking')
            output.redirect = "/login_page";
            output.errors = "User not logged in";
            res.json(output);
            res.end();
            return;
        } else {
            user_id = req.session.user_id;
        }

        let team_code = req.body.team_code;

        let athlete_info_id = req.session.athlete_info_id;

        // console.log("Join team body team code", team_code);
        // console.log("Join team athlete info id", athlete_info_id);

        // =================================================
        // ==== select team_id via team_code from teams ====
        // ============ add athlete in athletes ============
        // ========== return team_id to front end ==========
        // =================================================
        let query = `
            SELECT team_id, team_name
            FROM teams
            WHERE team_code = ?`;

        team_code = slashes.add(team_code);

        let inserts = [team_code];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query(mysqlQuery, asyncMiddleware((err, data, fields) => {
            let team_id;

            // console.log("join team 1st query data: ", data);

            if(data.length === 0) {
                output.errors = 'team code does not exist';
                output.redirect = '/join_team';
                res.json(output);
                res.end();
                return;
            }

            if (!err) {
            	// console.log(`Found Team ${data[0].team_id}`)
                output.success = true;
                output.data = data;
                req.session.team_id=data[0].team_id;
                req.session.team_code= team_code;
                req.session.team_name = data[0].team_name;
                team_id = data[0].team_id;
                addAthleteToTable(athlete_info_id, team_id, output);
            } else {
                output.errors = err;
            }

            function addAthleteToTable(athleteInfoId, teamId, output) {
                let query = `
                INSERT INTO athletes
                    (
                        athlete_info_id,
                        team_id
                    )
                VALUES (
                    ?,
                    ?
                )
            `;

                let inserts = [athleteInfoId, teamId];

                let mysqlQuery = mysql.format(query, inserts);

                dataBase.query(mysqlQuery, (err, data, fields) => {
                    if (!err) {
                    	// console.log(`Created Athlete: ${data.insertId} in team ${teamId}`)
                        req.session.athlete_id = data.insertId;  
                        output.success = true;
                        output.data = data;
                        output.redirect = "/bulletin_board";
                    } else {
                        output.errors = err;
                    };

                    res.json(output);
                });
            };
        }));
    }));

};
