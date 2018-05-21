module.exports = function(webserver, dataBase, mysql) {

    webserver.get("/api/bulletin_board", function(req, res) {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        console.log('Bulletin Board session: ', req.session);
    

        if (req.session.user_id === undefined) {
            output.redirect = '/login';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        }

        let user_id = req.session.user_id;
        // team_id will need to be provided from front end in axios call.
        let team_id;
        if(req.body.team_id){
            team_id = req.body.team_id
        } else {
            team_id = req.session.team_id
        }
        let athlete_id = req.session.athlete_id;
        let athlete_info_id = req.session.athlete_info_id;

        let athlete_info_id_query = `SELECT \`athlete_info\`.\`first_name\`, 
            \`athlete_info\`.\`last_name\`, 
            \`bulletin\`.\`athlete_id\`, 
            \`post_text\`, 
            \`timestamp\`, 
            \`pinned\`, 
            \`teams\`.\`team_name\`
            FROM \`bulletin\`
            JOIN \`teams\`
                ON \`bulletin\`.\`team_id\` = \`teams\`.\`team_id\`
            JOIN \`athletes\`
                ON \`bulletin\`.\`athlete_id\` = \`athletes\`.\`athlete_id\`
            JOIN \`athlete_info\`
                ON \`athletes\`.\`athlete_info_id\` = \`athlete_info\`.\`athlete_info_id\`
            WHERE \`bulletin\`.\`team_id\` = ? 
            ORDER BY \`timestamp\` DESC `;

        let athlete_info_id_inserts = [team_id];

        let athlete_info_id_sqlQuery = mysql.format(athlete_info_id_query, athlete_info_id_inserts);

        dataBase.query(athlete_info_id_sqlQuery, function(error, data, fields) {

            if(!error) {
                output.success = true;
                output.data = data;
                output.redirect = '/bulletin_board';
            } else {
                output.errors = error;
            }
            // console.log(output);
            res.json(output);

        });

    });

    webserver.post("/api/bulletin_board", (req, res) => {
        const output = {
            success: false,
            data: [],
            errors: []
        };

        if (req.body && req.session) {
            if (req.session.athlete_id) {
                var athlete_id = req.session.athlete_id;
                // will need to rework to pull ID from sessions
            }
            if (req.body.post_text) {
                var post_text = req.body.post_text;
                // assign bulletin post here`
            }
            if (req.session.team_id) {
                var team_id = req.session.team_id;
                // assign team name here
            }
            // if (req.body.pinned) {
            //     var pinned = req.body.pinned;
            // }
        } else {
            res.send("Missing Proper query items");
        }

        let query =
            "INSERT INTO " +
            "`bulletin` (`post_id`, `post_text`, `athlete_id`, `timestamp`, `team_id`, `pinned`) " +
            "VALUES (?, ?, ?, NOW(), ?, ?)";

        let inserts = [
            null,
            post_text,
            athlete_id,
            team_id,
            0,
        ];
        // will be inserting post_text, athlete_id, team_id, pinned

        let sqlQuery = mysql.format(query, inserts);

        console.log('sql query', sqlQuery)

        dataBase.query(sqlQuery, function(error, data, fields) {
            if (!error) {
                output.success = true;
                output.data = data;

            } else {
                output.errors = error;
            }

            console.log('BB insert data: ', data);

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
}
